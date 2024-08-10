import { AppModule } from '@/infra/app.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { hash } from 'bcryptjs'
import { JwtService } from '@nestjs/jwt'
import { makeRandomString } from 'test/factories/make-random-string'

describe('Fetch Recent Questions (E2E)', () => {
  let app: INestApplication
  let prisma: PrismaService
  let jwt: JwtService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleRef.createNestApplication()

    prisma = moduleRef.get(PrismaService)
    jwt = moduleRef.get(JwtService)

    await app.init()
  })

  test('[GET] /questions', async () => {
    const user = await prisma.user.create({
      data: {
        name: makeRandomString(),
        email: makeRandomString(),
        password: await hash('123456', 8),
      },
    })

    const accessToken = jwt.sign({ sub: user.id })

    await prisma.question.createMany({
      data: [
        {
          title: makeRandomString(),
          slug: makeRandomString(),
          content: makeRandomString(),
          authorId: user.id,
        },
        {
          title: makeRandomString(),
          slug: makeRandomString(),
          content: makeRandomString(),
          authorId: user.id,
        },
        {
          title: makeRandomString(),
          slug: makeRandomString(),
          content: makeRandomString(),
          authorId: user.id,
        },
      ],
    })

    const fakeQuestions = await prisma.question.findMany()
    const response = await request(app.getHttpServer())
      .get('/questions')
      .set('Authorization', `Bearer ${accessToken}`)
      .send()

    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual({
      questions: [
        expect.objectContaining({ title: fakeQuestions[0].title }),
        expect.objectContaining({ title: fakeQuestions[1].title }),
        expect.objectContaining({ title: fakeQuestions[2].title }),
      ],
    })
  })
})
