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

describe('Delete Question (E2E)', () => {
  let app: INestApplication
  let studentFactory: StudentFactory
  let questionFactory: QuestionFactory
  let prisma: PrismaService
  let jwt: JwtService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [StudentFactory, QuestionFactory],
    }).compile()

    app = moduleRef.createNestApplication()

    prisma = moduleRef.get(PrismaService)
    studentFactory = moduleRef.get(StudentFactory)
    questionFactory = moduleRef.get(QuestionFactory)

    jwt = moduleRef.get(JwtService)

    await app.init()
  })

  test('[DELETE] /questions/:id', async () => {
    const user = await studentFactory.makePrismaStudent({
      name: makeRandomString(),
      email: makeRandomString(),
      password: await hash(makeRandomString(), 8),
    })

    const accessToken = jwt.sign({ sub: user.id.toString() })
    const fakeQuestion = await questionFactory.makePrismaQuestion({
      authorId: user.id,
    })
    const questionId = fakeQuestion.id.toString()

    const response = await request(app.getHttpServer())
      .delete(`/questions/${questionId}`)
      .set('Authorization', `Bearer ${accessToken}`)

    expect(response.statusCode).toBe(204)

    const questionOnDatabase = await prisma.question.findUnique({
      where: {
        id: questionId,
      },
    })

    expect(questionOnDatabase).toBeNull()
  })
})
