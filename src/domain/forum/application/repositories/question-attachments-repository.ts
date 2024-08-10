import { QuestionAttachment } from '../../enterprise/entities/question-attatchment'

export abstract class QuestionAttachmentsRepository {
  abstract deleteManyByQuestionId(questionId: string): Promise<void>
  abstract findManyByQuestionId(questionId: string): Promise<QuestionAttachment[]>
}
