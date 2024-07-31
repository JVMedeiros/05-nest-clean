import { QuestionsRepository } from '@/domain/forum/application/repositories/questions-respository'
import { FetchRecentQuestionsUseCase } from '@/domain/forum/application/use-cases/fetch-recent-questions'
import { Injectable } from '@nestjs/common'

@Injectable()
export class NestFetchQuestionsUseCase extends FetchRecentQuestionsUseCase {
  constructor(questionsRepository: QuestionsRepository) {
    super(questionsRepository)
  }
}
