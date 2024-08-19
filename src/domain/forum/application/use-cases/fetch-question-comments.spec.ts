import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { makeQuestionComment } from 'test/factories/make-question-comment'
import { makeRandomString } from 'test/factories/make-random-string'
import { makeStudent } from 'test/factories/make-student'
import { InMemoryQuestionCommentsRepository } from 'test/repositories/in-memory-question-comments-repository'
import { InMemoryStudentsRepository } from 'test/repositories/in-memory-students-repository'
import { expect } from 'vitest'
import { FetchQuestionCommentsUseCase } from './fetch-question-comments'

let inMemoryStudentsRepository: InMemoryStudentsRepository
let inMemoryQuestionCommentsRepository: InMemoryQuestionCommentsRepository
let sut: FetchQuestionCommentsUseCase

describe('Fetch Question Comments', () => {
  beforeEach(() => {
    inMemoryStudentsRepository = new InMemoryStudentsRepository()
    inMemoryQuestionCommentsRepository =
      new InMemoryQuestionCommentsRepository(inMemoryStudentsRepository)
    sut = new FetchQuestionCommentsUseCase(inMemoryQuestionCommentsRepository)
  })
  it('Should be able to fetch recent question comments', async () => {
    const fakeStudentName = makeRandomString()
    const student = makeStudent({ name: fakeStudentName })
    await inMemoryStudentsRepository.items.push(student)

    const fakeComment1 = makeQuestionComment({
      questionId: new UniqueEntityID('question-1'),
      authorId: student.id
    })
    const fakeComment2 = makeQuestionComment({
      questionId: new UniqueEntityID('question-1'),
      authorId: student.id
    })
    const fakeComment3 = makeQuestionComment({
      questionId: new UniqueEntityID('question-1'),
      authorId: student.id
    })
    await inMemoryQuestionCommentsRepository.create(fakeComment1)
    await inMemoryQuestionCommentsRepository.create(fakeComment2)
    await inMemoryQuestionCommentsRepository.create(fakeComment3)


    const result = await sut.execute({
      questionId: 'question-1',
      page: 1,
    })

    expect(result.value?.comments).toHaveLength(3)
    expect(result.value?.comments).toEqual(expect.arrayContaining([
      expect.objectContaining({
        author: fakeStudentName,
        commentId: fakeComment1.id.toString()
      }),
      expect.objectContaining({
        author: fakeStudentName,
        commentId: fakeComment2.id.toString()
      }),
      expect.objectContaining({
        author: fakeStudentName,
        commentId: fakeComment3.id.toString()
      })
    ]))
  })

  it('Should be able to fetch paginated question comments', async () => {
    const fakeStudentName = makeRandomString()
    const student = makeStudent({ name: fakeStudentName })
    await inMemoryStudentsRepository.items.push(student)

    for (let i = 1; i <= 22; i++) {
      await inMemoryQuestionCommentsRepository.create(
        makeQuestionComment({ questionId: new UniqueEntityID('question-1'), authorId: student.id }),
      )
    }
    const result = await sut.execute({
      questionId: 'question-1',
      page: 2,
    })

    expect(result.value?.comments).toHaveLength(2)
  })
})
