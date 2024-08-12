import { AppModule } from '@/infra/app.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { hash } from 'bcryptjs'
import { JwtService } from '@nestjs/jwt'
import { makeRandomString } from 'test/factories/make-random-string'
import { QuestionFactory } from 'test/factories/make-question'
import { StudentFactory } from 'test/factories/make-student'
import { DatabaseModule } from '@/infra/database/database.module'
import { AnswerFactory } from 'test/factories/make-answer'

describe('Fetch Question Answers (E2E)', () => {
  let app: INestApplication
  let prisma: PrismaService
  let studentFactory: StudentFactory
  let questionFactory: QuestionFactory
  let answerFactory: AnswerFactory
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

  test('[GET] /questions/:questionId/answers', async () => {
    const user = await studentFactory.makePrismaStudent()

    const accessToken = jwt.sign({ sub: user.id.toString() })
    const fakeQuestion = await questionFactory.makePrismaQuestion({
      authorId: user.id,
      title: makeRandomString(),
    })

    await Promise.all([
      answerFactory.makePrismaAnswer({
        authorId: user.id,
        questionId: fakeQuestion.id,
        content: makeRandomString(),
      }),
      answerFactory.makePrismaAnswer({
        authorId: user.id,
        questionId: fakeQuestion.id,
        content: makeRandomString(),
      }),
      answerFactory.makePrismaAnswer({
        authorId: user.id,
        questionId: fakeQuestion.id,
        content: makeRandomString(),
      }),
    ])

    const questionId = fakeQuestion.id.toString()
    const fakeQuestions = await prisma.answer.findMany()

    const response = await request(app.getHttpServer())
      .get(`/questions/${questionId}/answers`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send()

    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual({
      answers: expect.arrayContaining([
        expect.objectContaining({ content: fakeQuestions[0].content }),
        expect.objectContaining({ content: fakeQuestions[1].content }),
        expect.objectContaining({ content: fakeQuestions[2].content }),
      ]),
    })
  })
})
