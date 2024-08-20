import { AnswersRepository } from '@/domain/forum/application/repositories/answers-repository'
import { QuestionsRepository } from '@/domain/forum/application/repositories/questions-repository'
import { ChooseQuestionBestAnswerUseCase } from '@/domain/forum/application/use-cases/choose-question-best-answer'
import { Injectable } from '@nestjs/common'

@Injectable()
export class NestChooseQuestionBestAnswerUseCase extends ChooseQuestionBestAnswerUseCase {
  constructor(
    questionsRepository: QuestionsRepository,
    answersRepository: AnswersRepository,
  ) {
    super(questionsRepository, answersRepository)
  }
}
