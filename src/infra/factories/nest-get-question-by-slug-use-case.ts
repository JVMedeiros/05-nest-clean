import { QuestionsRepository } from '@/domain/forum/application/repositories/questions-respository'
import { GetQuestionBySlugUseCase } from '@/domain/forum/application/use-cases/get-question-by-slug'
import { Injectable } from '@nestjs/common'

@Injectable()
export class NestGetQuestionBySlugUseCase extends GetQuestionBySlugUseCase {
  constructor(questionsRepository: QuestionsRepository) {
    super(questionsRepository)
  }
}
