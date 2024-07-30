import { QuestionAttachmentsRepository } from '@/domain/forum/application/repositories/question-attachments-repository'
import { QuestionAttachment } from '@/domain/forum/enterprise/entities/question-attatchment'
import { Injectable } from '@nestjs/common'

@Injectable()
export class PrismaQuestionAttachmentsRepository
  implements QuestionAttachmentsRepository
{
  deleteManyByQuestionId(questionId: string): Promise<void> {
    throw new Error('Method not implemented.')
  }

  findManyByQuestionId(questionId: string): Promise<QuestionAttachment[]> {
    throw new Error('Method not implemented.')
  }
}
