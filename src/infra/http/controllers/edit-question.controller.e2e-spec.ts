import { AppModule } from '@/infra/app.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { hash } from 'bcryptjs'
import { JwtService } from '@nestjs/jwt'
import { makeRandomString } from 'test/factories/make-random-string'
import { StudentFactory } from 'test/factories/make-student'
import { DatabaseModule } from '@/infra/database/database.module'
import { QuestionFactory } from 'test/factories/make-question'
import { AttachmentFactory } from 'test/factories/make-attachment'
import { QuestionAttachmentFactory } from 'test/factories/make-question-attachment'

describe('Edit Question (E2E)', () => {
  let app: INestApplication
  let studentFactory: StudentFactory
  let questionFactory: QuestionFactory
  let attachmentFactory: AttachmentFactory
  let questionAttachmentFactory: QuestionAttachmentFactory
  let prisma: PrismaService
  let jwt: JwtService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [StudentFactory, QuestionFactory, AttachmentFactory, QuestionAttachmentFactory]
    }).compile()

    app = moduleRef.createNestApplication()

    prisma = moduleRef.get(PrismaService)
    studentFactory = moduleRef.get(StudentFactory)
    questionFactory = moduleRef.get(QuestionFactory)
    attachmentFactory = moduleRef.get(AttachmentFactory)
    questionAttachmentFactory = moduleRef.get(QuestionAttachmentFactory)
    jwt = moduleRef.get(JwtService)

    await app.init()
  })

  test('[PUT] /questions/:id', async () => {
    const user = await studentFactory.makePrismaStudent({
      name: makeRandomString(),
      email: makeRandomString(),
      password: await hash(makeRandomString(), 8),
    })

    const accessToken = jwt.sign({ sub: user.id.toString() })

    const fakeAttachment1 = await attachmentFactory.makePrismaAttachment()
    const fakeAttachment2 = await attachmentFactory.makePrismaAttachment()
    const fakeQuestion = await questionFactory.makePrismaQuestion({
      authorId: user.id
    })

    await questionAttachmentFactory.makePrismaQuestionAttachment({
      attachmentId: fakeAttachment1.id,
      questionId: fakeQuestion.id
    })
    await questionAttachmentFactory.makePrismaQuestionAttachment({
      attachmentId: fakeAttachment2.id,
      questionId: fakeQuestion.id
    })

    const questionId = fakeQuestion.id.toString()
    const fakeAttachment3 = await attachmentFactory.makePrismaAttachment()
    const fakePayload = {
      title: makeRandomString(),
      content: makeRandomString(),
    }

    const response = await request(app.getHttpServer())
      .put(`/questions/${questionId}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        title: fakePayload.title,
        content: fakePayload.content,
        attachments: [
          fakeAttachment1.id.toString(),
          fakeAttachment3.id.toString()
        ]
      })


    const questionOnDatabase = await prisma.question.findFirst({
      where: {
        title: fakePayload.title,
      },
    })
    const attachmentsOnDatabase = await prisma.attachment.findMany({
      where: {
        questionId: questionOnDatabase?.id
      }
    })

    expect(response.statusCode).toBe(204)
    expect(questionOnDatabase).toBeTruthy()
    expect(attachmentsOnDatabase).toHaveLength(2)
    expect(attachmentsOnDatabase).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: fakeAttachment1.id.toString()
        }),
        expect.objectContaining({
          id: fakeAttachment3.id.toString()
        }),
      ]))

  })
})
