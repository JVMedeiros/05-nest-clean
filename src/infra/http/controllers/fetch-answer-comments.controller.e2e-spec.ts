import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { AnswerFactory } from 'test/factories/make-answer'
import { AnswerCommentFactory } from 'test/factories/make-answer-comment'
import { QuestionFactory } from 'test/factories/make-question'
import { QuestionCommentFactory } from 'test/factories/make-question-comment'
import { makeRandomString } from 'test/factories/make-random-string'
import { StudentFactory } from 'test/factories/make-student'

describe('Fetch question comments (E2E)', () => {
  let app: INestApplication
  let studentFactory: StudentFactory
  let questionFactory: QuestionFactory
  let answerFactory: AnswerFactory
  let answerCommentFactory: AnswerCommentFactory
  let jwt: JwtService
  let prisma: PrismaService


  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [StudentFactory, QuestionFactory, AnswerFactory, AnswerCommentFactory],
    }).compile()

    app = moduleRef.createNestApplication()

    prisma = moduleRef.get(PrismaService)
    studentFactory = moduleRef.get(StudentFactory)
    questionFactory = moduleRef.get(QuestionFactory)
    answerFactory = moduleRef.get(AnswerFactory)
    answerCommentFactory = moduleRef.get(AnswerCommentFactory)
    jwt = moduleRef.get(JwtService)

    await app.init()
  })

  test('[GET] /answers/:answerId/comments', async () => {
    const fakeUserName = makeRandomString()
    const user = await studentFactory.makePrismaStudent({ name: fakeUserName })

    const accessToken = jwt.sign({ sub: user.id.toString() })

    const fakeQuestion = await questionFactory.makePrismaQuestion({
      authorId: user.id,
    })

    const fakeAnswer = await answerFactory.makePrismaAnswer({
      questionId: fakeQuestion.id,
      authorId: user.id,
    })

    await Promise.all([
      answerCommentFactory.makePrismaAnswerComment({
        authorId: user.id,
        answerId: fakeAnswer.id,
        content: makeRandomString(),
      }),
      answerCommentFactory.makePrismaAnswerComment({
        authorId: user.id,
        answerId: fakeAnswer.id,
        content: makeRandomString(),
      }),
      answerCommentFactory.makePrismaAnswerComment({
        authorId: user.id,
        answerId: fakeAnswer.id,
        content: makeRandomString(),
      }),
    ])

    const answerId = fakeAnswer.id.toString()
    const fakeAnswerComments = await prisma.comment.findMany()

    const response = await request(app.getHttpServer())
      .get(`/answers/${answerId}/comments`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send()

    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual({
      comments: expect.arrayContaining([
        expect.objectContaining({
          content: fakeAnswerComments[0].content,
          authorName: fakeUserName,
        }),
        expect.objectContaining({
          content: fakeAnswerComments[1].content,
          authorName: fakeUserName,
        }),
        expect.objectContaining({
          content: fakeAnswerComments[2].content,
          authorName: fakeUserName,
        }),
      ]),
    })
  })
})