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
import { waitFor } from 'test/utils/wait-for'
import { DomainEvents } from '@/core/events/domain-events'

describe('On Question Best Answer Chosen (E2E)', () => {
  let app: INestApplication
  let studentFactory: StudentFactory
  let questionFactory: QuestionFactory
  let answerFactory: AnswerFactory
  let prisma: PrismaService
  let jwt: JwtService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [StudentFactory, QuestionFactory, AnswerFactory],
    }).compile()

    app = moduleRef.createNestApplication()

    prisma = moduleRef.get(PrismaService)
    studentFactory = moduleRef.get(StudentFactory)
    questionFactory = moduleRef.get(QuestionFactory)
    answerFactory = moduleRef.get(AnswerFactory)

    jwt = moduleRef.get(JwtService)

    DomainEvents.shouldRun = true

    await app.init()
  })

  it('Should send a notification when question best answer is chosen', async () => {
    const user = await studentFactory.makePrismaStudent({
      name: makeRandomString(),
      email: makeRandomString(),
      password: await hash(makeRandomString(), 8),
    })

    const accessToken = jwt.sign({ sub: user.id.toString() })
    const fakeQuestion = await questionFactory.makePrismaQuestion({
      authorId: user.id,
    })
    const fakeAnswer = await answerFactory.makePrismaAnswer({
      questionId: fakeQuestion.id,
      authorId: user.id,
    })

    const answerId = fakeAnswer.id.toString()
    const fakePayload = {
      content: makeRandomString(),
    }

    await request(app.getHttpServer())
      .patch(`/answers/${answerId}/choose-as-best`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        content: fakePayload.content,
      })

    await waitFor(async () => {
      const notificationOnDatabase = await prisma.notification.findFirst({
        where: {
          recipientId: user.id.toString()
        }
      })
      expect(notificationOnDatabase).not.toBeNull()
    })
  })
})
