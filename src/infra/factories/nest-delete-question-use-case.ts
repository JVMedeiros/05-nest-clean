import { QuestionsRepository } from '@/domain/forum/application/repositories/questions-repository'
import { DeleteQuestionUseCase } from '@/domain/forum/application/use-cases/delete-question'
import { Injectable } from '@nestjs/common'

@Injectable()
export class NestDeleteQuestionUseCase extends DeleteQuestionUseCase {
  constructor(questionsRepository: QuestionsRepository) {
    super(questionsRepository)
  }
}
