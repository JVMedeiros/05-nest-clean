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
import { AnswerFactory } from 'test/factories/make-answer'

describe('Choose Question Best Answer (E2E)', () => {
  let app: INestApplication
  let studentFactory: StudentFactory
  let questionFactory: QuestionFactory
  let answerFactory: AnswerFactory
  let prisma: PrismaService
  let jwt: JwtService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [StudentFactory, QuestionFactory, AnswerFactory]
    }).compile()

    app = moduleRef.createNestApplication()

    prisma = moduleRef.get(PrismaService)
    studentFactory = moduleRef.get(StudentFactory)
    questionFactory = moduleRef.get(QuestionFactory)
    answerFactory = moduleRef.get(AnswerFactory)

    jwt = moduleRef.get(JwtService)

    await app.init()
  })

  test('[PATCH] /answers/:answerId/choose-as-best', async () => {
    const user = await studentFactory.makePrismaStudent({
      name: makeRandomString(),
      email: makeRandomString(),
      password: await hash(makeRandomString(), 8),
    })

    const accessToken = jwt.sign({ sub: user.id.toString() })
    const fakeQuestion = await questionFactory.makePrismaQuestion({
      authorId: user.id
    })
    const fakeAnswer = await answerFactory.makePrismaAnswer({
      questionId: fakeQuestion.id,
      authorId: user.id
    })

    const answerId = fakeAnswer.id.toString()
    const fakePayload = {
      content: makeRandomString(),
    }

    const response = await request(app.getHttpServer())
      .patch(`/answers/${answerId}/choose-as-best`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        content: fakePayload.content,
      })

    expect(response.statusCode).toBe(204)

    const questionOnDatabase = await prisma.question.findUnique({
      where: {
        id: fakeQuestion.id.toString(),
      },
    })

    expect(questionOnDatabase?.bestAnswerId).toEqual(answerId)
  })
})
