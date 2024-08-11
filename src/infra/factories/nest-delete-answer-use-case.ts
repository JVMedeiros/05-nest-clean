import { AnswersRepository } from '@/domain/forum/application/repositories/answers-repository'
import { DeleteAnswerUseCase } from '@/domain/forum/application/use-cases/delete-answer'
import { Injectable } from '@nestjs/common'

@Injectable()
export class NestDeleteAnswerUseCase extends DeleteAnswerUseCase {
  constructor(
    answersRepository: AnswersRepository,
  ) {
    super(answersRepository)
  }
}
