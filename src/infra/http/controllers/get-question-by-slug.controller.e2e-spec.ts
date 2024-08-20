import { AppModule } from '@/infra/app.module'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { JwtService } from '@nestjs/jwt'
import { makeRandomString } from 'test/factories/make-random-string'
import { StudentFactory } from 'test/factories/make-student'
import { DatabaseModule } from '@/infra/database/database.module'
import { QuestionFactory } from 'test/factories/make-question'
import { Slug } from '@/domain/forum/enterprise/entities/value-objects/slug'
import { AttachmentFactory } from 'test/factories/make-attachment'
import { QuestionAttachmentFactory } from 'test/factories/make-question-attachment'

describe('Get Question By Slug (E2E)', () => {
  let app: INestApplication
  let studentFactory: StudentFactory
  let questionFactory: QuestionFactory
  let attachmentFactory: AttachmentFactory
  let questionAttachmentFactory: QuestionAttachmentFactory
  let jwt: JwtService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [
        StudentFactory,
        QuestionFactory,
        AttachmentFactory,
        QuestionAttachmentFactory,
      ],
    }).compile()

    app = moduleRef.createNestApplication()

    studentFactory = moduleRef.get(StudentFactory)
    questionFactory = moduleRef.get(QuestionFactory)
    attachmentFactory = moduleRef.get(AttachmentFactory)
    questionAttachmentFactory = moduleRef.get(QuestionAttachmentFactory)
    jwt = moduleRef.get(JwtService)

    await app.init()
  })

  test('[GET] /questions/:slug', async () => {
    const fakeUserName = makeRandomString()
    const fakeUser = await studentFactory.makePrismaStudent({
      name: fakeUserName,
    })
    const accessToken = jwt.sign({ sub: fakeUser.id.toString() })

    //TODO: Missing an factory to make a random slug based on question title -> refactor on makeRandomString to generate a non number string? 
    const fakeQuestionTitle = makeRandomString()
    const fakeQuestion = await questionFactory.makePrismaQuestion({
      authorId: fakeUser.id,
      title: fakeQuestionTitle,
      slug: Slug.create('slug-01'),
    })

    const fakeAttachmentTitle = makeRandomString()
    const fakeAttachment = await attachmentFactory.makePrismaAttachment({
      title: fakeAttachmentTitle,
    })

    await questionAttachmentFactory.makePrismaQuestionAttachment({
      attachmentId: fakeAttachment.id,
      questionId: fakeQuestion.id,
    })

    const response = await request(app.getHttpServer())
      .get('/questions/slug-01')
      .set('Authorization', `Bearer ${accessToken}`)
      .send()

    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual({
      question: expect.objectContaining({
        title: fakeQuestionTitle,
        author: fakeUserName,
        attachments: [
          expect.objectContaining({
            title: fakeAttachmentTitle,
          }),
        ],
      }),
    })
  })
})
