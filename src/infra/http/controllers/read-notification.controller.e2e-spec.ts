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
import { NotificationFactory } from 'test/factories/make-notification'
import { PrismaService } from '@/infra/database/prisma/prisma.service'

describe('Get Question By Slug (E2E)', () => {
  let app: INestApplication
  let studentFactory: StudentFactory
  let prisma: PrismaService
  let notificationFactory: NotificationFactory
  let jwt: JwtService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [
        StudentFactory,
        PrismaService,
        NotificationFactory
      ],
    }).compile()

    app = moduleRef.createNestApplication()

    studentFactory = moduleRef.get(StudentFactory)
    prisma = moduleRef.get(PrismaService)
    notificationFactory = moduleRef.get(NotificationFactory)
    jwt = moduleRef.get(JwtService)

    await app.init()
  })

  test('[PATCH] /notifications/:notificationId/read', async () => {
    const fakeUserName = makeRandomString()
    const fakeUser = await studentFactory.makePrismaStudent({
      name: fakeUserName,
    })
    const accessToken = jwt.sign({ sub: fakeUser.id.toString() })

    const fakeNotification = await notificationFactory.makePrismaNotification({
      recipientId: fakeUser.id,
    })
    const notificationId = fakeNotification.id.toString()

    const response = await request(app.getHttpServer())
      .patch(`/notifications/${notificationId}/read`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send()

    const notificationOnDatabase = await prisma.notification.findFirst({
      where: {
        recipientId: fakeUser.id.toString()
      }
    })

    expect(response.statusCode).toBe(204)
    expect(notificationOnDatabase?.readAt).not.toBeNull()
  })
})
