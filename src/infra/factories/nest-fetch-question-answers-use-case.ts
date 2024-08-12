import { AnswersRepository } from '@/domain/forum/application/repositories/answers-repository'
import { QuestionsRepository } from '@/domain/forum/application/repositories/questions-respository'
import { FetchQuestionAnswersUseCase } from '@/domain/forum/application/use-cases/fetch-question-answers'
import { FetchRecentQuestionsUseCase } from '@/domain/forum/application/use-cases/fetch-recent-questions'
import { Injectable } from '@nestjs/common'

@Injectable()
export class NestFetchQuestionAnswersUseCase extends FetchQuestionAnswersUseCase {
  constructor(answersRepository: AnswersRepository) {
    super(answersRepository)
  }
}
