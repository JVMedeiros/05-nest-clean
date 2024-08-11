import { HashGenerator } from '@/domain/forum/application/cryptography/hash-generator'
import { AnswerAttachmentsRepository } from '@/domain/forum/application/repositories/answer-attachments-repository'
import { AnswersRepository } from '@/domain/forum/application/repositories/answers-repository'
import { QuestionAttachmentsRepository } from '@/domain/forum/application/repositories/question-attachments-repository'
import { QuestionsRepository } from '@/domain/forum/application/repositories/questions-respository'
import { StudentsRepository } from '@/domain/forum/application/repositories/students-repository'
import { EditAnswerUseCase } from '@/domain/forum/application/use-cases/edit-answer'
import { EditQuestionUseCase } from '@/domain/forum/application/use-cases/edit-question'
import { RegisterStudentUseCase } from '@/domain/forum/application/use-cases/register-student'
import { AnswerAttachment } from '@/domain/forum/enterprise/entities/answer-attachment'
import { Injectable } from '@nestjs/common'

@Injectable()
export class NestEditAnswerUseCase extends EditAnswerUseCase {
  constructor(
    answersRepository: AnswersRepository,
    answerAttachmentsRepository: AnswerAttachmentsRepository,
  ) {
    super(answersRepository, answerAttachmentsRepository)
  }
}
