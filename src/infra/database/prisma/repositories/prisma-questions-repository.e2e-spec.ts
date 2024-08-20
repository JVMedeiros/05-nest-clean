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
import { CacheRepository } from '@/infra/cache/cache-repository'
import { CacheModule } from '@/infra/cache/cache.module'
import { QuestionsRepository } from '@/domain/forum/application/repositories/questions-repository'

describe('Prisma Questions Repository (E2E)', () => {
  let app: INestApplication
  let studentFactory: StudentFactory
  let questionFactory: QuestionFactory
  let attachmentFactory: AttachmentFactory
  let questionAttachmentFactory: QuestionAttachmentFactory
  let questionsRepository: QuestionsRepository
  let cacheRepository: CacheRepository
  let jwt: JwtService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule, CacheModule],
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
    questionsRepository = moduleRef.get(QuestionsRepository)
    cacheRepository = moduleRef.get(CacheRepository)
    jwt = moduleRef.get(JwtService)

    await app.init()
  })

  it('Should cache question details', async () => {
    const fakeUser = await studentFactory.makePrismaStudent()
    const fakeQuestion = await questionFactory.makePrismaQuestion({
      authorId: fakeUser.id,
    })
    const fakeAttachment = await attachmentFactory.makePrismaAttachment()

    await questionAttachmentFactory.makePrismaQuestionAttachment({
      attachmentId: fakeAttachment.id,
      questionId: fakeQuestion.id,
    })

    const slug = fakeQuestion.slug.value

    const questionDetails = await questionsRepository.findDetailsBySlug(slug)
    const cached = await cacheRepository.get(`question:${slug}:details`)

    if (!cached) {
      throw new Error()
    }

    expect(JSON.parse(cached)).toEqual(expect.objectContaining({
      id: questionDetails?.questionId.toString(),
    }))
  })

  it('Should return cached question details on subsequent calls', async () => {
    const fakeUser = await studentFactory.makePrismaStudent()
    const fakeQuestion = await questionFactory.makePrismaQuestion({
      authorId: fakeUser.id,
    })
    const fakeAttachment = await attachmentFactory.makePrismaAttachment()

    await questionAttachmentFactory.makePrismaQuestionAttachment({
      attachmentId: fakeAttachment.id,
      questionId: fakeQuestion.id,
    })

    const slug = fakeQuestion.slug.value

    let cached = await cacheRepository.get(`question:${slug}:details`)
    expect(cached).toBeNull()

    await questionsRepository.findDetailsBySlug(slug)
    cached = await cacheRepository.get(`question:${slug}:details`)
    expect(cached).not.toBeNull()

    if (!cached) {
      throw new Error()
    }

    const questionDetails = await questionsRepository.findDetailsBySlug(slug)

    expect(JSON.parse(cached)).toEqual(expect.objectContaining({
      id: questionDetails?.questionId.toString(),
    }))
  })

  it('Should reset question details cache when saving the question', async () => {
    const fakeUser = await studentFactory.makePrismaStudent()
    const fakeQuestion = await questionFactory.makePrismaQuestion({
      authorId: fakeUser.id,
    })
    const fakeAttachment = await attachmentFactory.makePrismaAttachment()

    await questionAttachmentFactory.makePrismaQuestionAttachment({
      attachmentId: fakeAttachment.id,
      questionId: fakeQuestion.id,
    })

    const slug = fakeQuestion.slug.value
    await cacheRepository.set(`question:${slug}:details`, JSON.stringify({ empty: true }))

    await questionsRepository.save(fakeQuestion)
    const cached = await cacheRepository.get(`question:${slug}:details`)

    expect(cached).toBeNull()
  })
})
