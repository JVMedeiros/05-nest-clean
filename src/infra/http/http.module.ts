import { AuthenticateStudentUseCase } from '@/domain/forum/application/use-cases/authenticate-student'
import { Module } from '@nestjs/common'
import { CryptographyModule } from '../cryptography/cryptography.module'
import { DatabaseModule } from '../database/database.module'
import { PrismaService } from '../database/prisma/prisma.service'
import {
  NestCreateQuestionUseCase,
  NestFetchQuestionsUseCase,
  NestAuthenticateStudentUseCase,
  NestRegisterStudentUseCase,
} from '../factories'
import { AuthenticateController } from './controllers/authenticate.controller'
import { CreateAccountController } from './controllers/create-account.controller'
import { CreateQuestionController } from './controllers/create-question.controller'
import { FetchRecentQuestionsController } from './controllers/fetch-recent-questions.controller'

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [
    CreateAccountController,
    AuthenticateController,
    CreateQuestionController,
    FetchRecentQuestionsController,
  ],
  providers: [
    PrismaService,
    NestCreateQuestionUseCase,
    NestFetchQuestionsUseCase,
    NestAuthenticateStudentUseCase,
    NestRegisterStudentUseCase,
    AuthenticateStudentUseCase,
  ],
})
export class HttpModule { }
