import { AppModule } from '@/infra/app.module'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { hash } from 'bcryptjs'
import { makeRandomString } from 'test/factories/make-random-string'
import { makeRandomEmail } from 'test/factories/make-random-email'
import { StudentFactory } from 'test/factories/make-student'
import { DatabaseModule } from '@/infra/database/database.module'

describe('Authenticate (E2E)', () => {
  let app: INestApplication
  let studentFactory: StudentFactory

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [StudentFactory],
    }).compile()

    app = moduleRef.createNestApplication()
    studentFactory = moduleRef.get(StudentFactory)

    await app.init()
  })

  test('[POST] /sessions', async () => {
    const fakePayload = {
      name: makeRandomString(),
      email: makeRandomEmail(),
      password: makeRandomString(),
    }

    await studentFactory.makePrismaStudent({
      name: fakePayload.name,
      email: fakePayload.email,
      password: await hash(fakePayload.password, 8),
    })

    const response = await request(app.getHttpServer()).post('/sessions').send({
      email: fakePayload.email,
      password: fakePayload.password,
    })

    expect(response.statusCode).toBe(201)
    expect(response.body).toEqual({
      access_token: expect.any(String),
    })
  })
})
