import { AnswerCommentsRepository } from '@/domain/forum/application/repositories/answer-comments-repository'
import { QuestionCommentsRepository } from '@/domain/forum/application/repositories/question-comments-repository'
import { FetchAnswerCommentsUseCase } from '@/domain/forum/application/use-cases/fetch-answer-comments'
import { Injectable } from '@nestjs/common'

@Injectable()
export class NestFetchAnswerCommentsUseCase extends FetchAnswerCommentsUseCase {
  constructor(answerCommentsRepository: AnswerCommentsRepository) {
    super(answerCommentsRepository)
  }
}
