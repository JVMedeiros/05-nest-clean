import { HashGenerator } from '@/domain/forum/application/cryptography/hash-generator'
import { QuestionAttachmentsRepository } from '@/domain/forum/application/repositories/question-attachments-repository'
import { QuestionsRepository } from '@/domain/forum/application/repositories/questions-repository'
import { StudentsRepository } from '@/domain/forum/application/repositories/students-repository'
import { EditQuestionUseCase } from '@/domain/forum/application/use-cases/edit-question'
import { RegisterStudentUseCase } from '@/domain/forum/application/use-cases/register-student'
import { Injectable } from '@nestjs/common'

@Injectable()
export class NestEditQuestionUseCase extends EditQuestionUseCase {
  constructor(
    questionsRepository: QuestionsRepository,
    questionAttachmentsRepository: QuestionAttachmentsRepository,
  ) {
    super(questionsRepository, questionAttachmentsRepository)
  }
}
