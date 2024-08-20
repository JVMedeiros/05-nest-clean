import { makeAttachment } from 'test/factories/make-attachment'
import { makeQuestion } from 'test/factories/make-question'
import { makeQuestionAttachment } from 'test/factories/make-question-attachment'
import { makeRandomString } from 'test/factories/make-random-string'
import { makeStudent } from 'test/factories/make-student'
import { InMemoryAttachmentsRepository } from 'test/repositories/in-memory-attachments-repository'
import { InMemoryQuestionAttachmentsRepository } from 'test/repositories/in-memory-question-attachments-repository'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { InMemoryStudentsRepository } from 'test/repositories/in-memory-students-repository'
import { expect } from 'vitest'
import { Slug } from '../../enterprise/entities/value-objects/slug'
import { GetQuestionBySlugUseCase } from './get-question-by-slug'

let inMemoryQuestionAttachmentsRepository: InMemoryQuestionAttachmentsRepository
let inMemoryAttachmentsRepository: InMemoryAttachmentsRepository
let inMemoryStudentsRepository: InMemoryStudentsRepository
let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: GetQuestionBySlugUseCase

describe('Get Question by Slug', () => {
  beforeEach(() => {
    inMemoryAttachmentsRepository = new InMemoryAttachmentsRepository()
    inMemoryStudentsRepository = new InMemoryStudentsRepository()
    inMemoryQuestionAttachmentsRepository =
      new InMemoryQuestionAttachmentsRepository()
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository(
      inMemoryQuestionAttachmentsRepository,
      inMemoryAttachmentsRepository,
      inMemoryStudentsRepository,
    )
    sut = new GetQuestionBySlugUseCase(inMemoryQuestionsRepository)
  })
  it('Should be able to find a question by slug', async () => {
    const fakeUserName = makeRandomString()
    const fakeStudent = makeStudent({ name: fakeUserName })
    await inMemoryStudentsRepository.items.push(fakeStudent)

    const fakeAttachmentTitle = makeRandomString()
    const fakeAttachment = makeAttachment({ title: fakeAttachmentTitle })
    await inMemoryAttachmentsRepository.items.push(fakeAttachment)

    const fakeQuestion = makeQuestion({
      authorId: fakeStudent.id,
      slug: Slug.create('example-question'),
    })
    const fakeQuestionAttachment = makeQuestionAttachment({
      attachmentId: fakeAttachment.id,
      questionId: fakeQuestion.id,
    })
    await inMemoryQuestionAttachmentsRepository.items.push(
      fakeQuestionAttachment,
    )

    await inMemoryQuestionsRepository.create(fakeQuestion)

    const result = await sut.execute({
      slug: 'example-question',
    })

    expect(result.value).toMatchObject({
      question: expect.objectContaining({
        title: fakeQuestion.title,
        author: fakeStudent.name,
        attachments: [
          expect.objectContaining({
            title: fakeAttachment.title,
          }),
        ],
      }),
    })
  })
})
