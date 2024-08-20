import { AnswerAttachmentsRepository } from '@/domain/forum/application/repositories/answer-attachments-repository'
import { AnswersRepository } from '@/domain/forum/application/repositories/answers-repository'
import { EditAnswerUseCase } from '@/domain/forum/application/use-cases/edit-answer'
import { Injectable } from '@nestjs/common'

@Injectable()
export class NestEditAnswerUseCase extends EditAnswerUseCase {
  constructor(
    answersRepository: AnswersRepository,
    answerAttachmentsRepository: AnswerAttachmentsRepository,
  ) {
    super(answersRepository, answerAttachmentsRepository)
  }
}
