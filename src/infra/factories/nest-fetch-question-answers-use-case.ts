import { AnswersRepository } from '@/domain/forum/application/repositories/answers-repository'
import { FetchQuestionAnswersUseCase } from '@/domain/forum/application/use-cases/fetch-question-answers'
import { Injectable } from '@nestjs/common'

@Injectable()
export class NestFetchQuestionAnswersUseCase extends FetchQuestionAnswersUseCase {
  constructor(answersRepository: AnswersRepository) {
    super(answersRepository)
  }
}
