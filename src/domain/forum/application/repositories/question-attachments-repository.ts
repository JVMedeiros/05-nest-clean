import { QuestionAttachment } from '../../enterprise/entities/question-attatchment'

export interface QuestionAttachmentsRepository {
  deleteManyByQuestionId(questionId: string): Promise<void>
  findManyByQuestionId(questionId: string): Promise<QuestionAttachment[]>
}
