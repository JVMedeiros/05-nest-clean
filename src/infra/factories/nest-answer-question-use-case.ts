import { AnswersRepository } from '@/domain/forum/application/repositories/answers-repository'
import { QuestionsRepository } from '@/domain/forum/application/repositories/questions-respository'
import { AnswerQuestionUseCase } from '@/domain/forum/application/use-cases/answer-question'
import { GetQuestionBySlugUseCase } from '@/domain/forum/application/use-cases/get-question-by-slug'
import { Injectable } from '@nestjs/common'

@Injectable()
export class NestAnswerQuestionUseCase extends AnswerQuestionUseCase {
  constructor(answersRepository: AnswersRepository) {
    super(answersRepository)
  }
}
