import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { makeAnswerComment } from 'test/factories/make-answer-comment'
import { makeRandomString } from 'test/factories/make-random-string'
import { makeStudent } from 'test/factories/make-student'
import { InMemoryAnswerCommentsRepository } from 'test/repositories/in-memory-answer-comments-repository'
import { InMemoryStudentsRepository } from 'test/repositories/in-memory-students-repository'
import { expect } from 'vitest'
import { FetchAnswerCommentsUseCase } from './fetch-answer-comments'

let inMemoryStudentsRepository: InMemoryStudentsRepository
let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentsRepository
let sut: FetchAnswerCommentsUseCase

describe('Fetch Answer Comments', () => {
  beforeEach(() => {
    inMemoryStudentsRepository = new InMemoryStudentsRepository()
    inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentsRepository(inMemoryStudentsRepository)
    sut = new FetchAnswerCommentsUseCase(inMemoryAnswerCommentsRepository)
  })
  it('Should be able to fetch recent answer comments', async () => {
    const fakeStudentName = makeRandomString()
    const student = makeStudent({ name: fakeStudentName })
    await inMemoryStudentsRepository.items.push(student)

    const fakeComment1 = makeAnswerComment({
      answerId: new UniqueEntityID('answer-1'),
      authorId: student.id
    })
    const fakeComment2 = makeAnswerComment({
      answerId: new UniqueEntityID('answer-1'),
      authorId: student.id
    })
    const fakeComment3 = makeAnswerComment({
      answerId: new UniqueEntityID('answer-1'),
      authorId: student.id
    })
    await inMemoryAnswerCommentsRepository.create(fakeComment1)
    await inMemoryAnswerCommentsRepository.create(fakeComment2)
    await inMemoryAnswerCommentsRepository.create(fakeComment3)

    const result = await sut.execute({
      answerId: 'answer-1',
      page: 1,
    })

    expect(result.value?.comments).toHaveLength(3)
    expect(result.value?.comments).toEqual(expect.arrayContaining([
      expect.objectContaining({
        author: fakeStudentName,
        commentId: fakeComment1.id
      }),
      expect.objectContaining({
        author: fakeStudentName,
        commentId: fakeComment2.id
      }),
      expect.objectContaining({
        author: fakeStudentName,
        commentId: fakeComment3.id
      })
    ])
    )
  })

  it('Should be able to fetch paginated answer comments', async () => {
    const fakeStudentName = makeRandomString()
    const student = makeStudent({ name: fakeStudentName })
    await inMemoryStudentsRepository.items.push(student)
    for (let i = 1; i <= 22; i++) {
      await inMemoryAnswerCommentsRepository.create(
        makeAnswerComment({ answerId: new UniqueEntityID('answer-1'), authorId: student.id }),
      )
    }
    const result = await sut.execute({
      answerId: 'answer-1',
      page: 2,
    })

    expect(result.value?.comments).toHaveLength(2)
  })
})
