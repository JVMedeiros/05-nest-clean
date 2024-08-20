import { InMemoryStudentsRepository } from 'test/repositories/in-memory-students-repository'
import { FakeHasher } from 'test/cryptography/fake-hasher'
import { FakeEncrypter } from 'test/cryptography/fake-encrypter'
import { makeStudent } from 'test/factories/make-student'
import { WrongCredentialsError } from './errors/wrong-credentials-error'
import { NestAuthenticateStudentUseCase } from '@/infra/factories'
import { makeRandomString } from 'test/factories/make-random-string'
import { makeRandomEmail } from 'test/factories/make-random-email'

let inMemoryStudentsRepository: InMemoryStudentsRepository
let fakeHasher: FakeHasher
let encrypter: FakeEncrypter

let sut: NestAuthenticateStudentUseCase

describe('Authenticate Student', () => {
  beforeEach(() => {
    inMemoryStudentsRepository = new InMemoryStudentsRepository()
    fakeHasher = new FakeHasher()
    encrypter = new FakeEncrypter()

    sut = new NestAuthenticateStudentUseCase(
      inMemoryStudentsRepository,
      fakeHasher,
      encrypter,
    )
  })

  it('should be able to authenticate a student', async () => {
    const fakeStudentPayload = {
      email: makeRandomEmail(),
      password: makeRandomString(),
    }
    const student = makeStudent({
      email: fakeStudentPayload.email,
      password: await fakeHasher.hash(fakeStudentPayload.password),
    })

    inMemoryStudentsRepository.items.push(student)

    const result = await sut.execute({
      email: fakeStudentPayload.email,
      password: fakeStudentPayload.password,
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual({
      accessToken: expect.any(String),
    })
  })

  it('Should not be able to authenticate a student with wrong email', async () => {
    const fakeStudentPayload = {
      email: makeRandomEmail(),
      password: makeRandomString(),
    }

    makeStudent({
      email: fakeStudentPayload.email,
      password: await fakeHasher.hash(fakeStudentPayload.password),
    })

    const result = await sut.execute({
      email: makeRandomEmail(),
      password: fakeStudentPayload.password,
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(WrongCredentialsError)
  })

  it('Should not be able to authenticate a student with wrong password', async () => {
    const fakeStudentPayload = {
      email: makeRandomEmail(),
      password: makeRandomString(),
    }

    makeStudent({
      email: fakeStudentPayload.email,
      password: await fakeHasher.hash(fakeStudentPayload.password),
    })

    const result = await sut.execute({
      email: fakeStudentPayload.email,
      password: makeRandomString(),
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(WrongCredentialsError)
  })
})
