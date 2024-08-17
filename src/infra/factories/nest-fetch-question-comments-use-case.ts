import { QuestionCommentsRepository } from '@/domain/forum/application/repositories/question-comments-repository'
import { FetchQuestionCommentsUseCase } from '@/domain/forum/application/use-cases/fetch-question-comments'
import { Injectable } from '@nestjs/common'

@Injectable()
export class NestFetchQuestionCommentsUseCase extends FetchQuestionCommentsUseCase {
  constructor(questionCommentsRepository: QuestionCommentsRepository) {
    super(questionCommentsRepository)
  }
}
