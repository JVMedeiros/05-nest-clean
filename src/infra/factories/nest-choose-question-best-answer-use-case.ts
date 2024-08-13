import { Encrypter } from '@/domain/forum/application/cryptography/encrypter'
import { HashComparer } from '@/domain/forum/application/cryptography/hash-comparer'
import { AnswersRepository } from '@/domain/forum/application/repositories/answers-repository'
import { QuestionsRepository } from '@/domain/forum/application/repositories/questions-respository'
import { StudentsRepository } from '@/domain/forum/application/repositories/students-repository'
import { AuthenticateStudentUseCase } from '@/domain/forum/application/use-cases/authenticate-student'
import { ChooseQuestionBestAnswerUseCase } from '@/domain/forum/application/use-cases/choose-question-best-answer'
import { Injectable } from '@nestjs/common'

@Injectable()
export class NestChooseQuestionBestAnswerUseCase extends ChooseQuestionBestAnswerUseCase {
  constructor(
    questionsRepository: QuestionsRepository,
    answersRepository: AnswersRepository
  ) {
    super(questionsRepository, answersRepository)
  }
}
