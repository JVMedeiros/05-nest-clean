import { HashGenerator } from '@/domain/forum/application/cryptography/hash-generator'
import { QuestionAttachmentsRepository } from '@/domain/forum/application/repositories/question-attachments-repository'
import { QuestionsRepository } from '@/domain/forum/application/repositories/questions-respository'
import { StudentsRepository } from '@/domain/forum/application/repositories/students-repository'
import { DeleteQuestionUseCase } from '@/domain/forum/application/use-cases/delete-question'
import { EditQuestionUseCase } from '@/domain/forum/application/use-cases/edit-question'
import { RegisterStudentUseCase } from '@/domain/forum/application/use-cases/register-student'
import { Injectable } from '@nestjs/common'

@Injectable()
export class NestDeleteQuestionUseCase extends DeleteQuestionUseCase {
  constructor(
    questionsRepository: QuestionsRepository,
  ) {
    super(questionsRepository)
  }
}
