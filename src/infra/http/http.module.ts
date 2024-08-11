import { Module } from '@nestjs/common'
import { CryptographyModule } from '../cryptography/cryptography.module'
import { DatabaseModule } from '../database/database.module'
import { PrismaService } from '../database/prisma/prisma.service'
import {
  NestCreateQuestionUseCase,
  NestFetchQuestionsUseCase,
  NestAuthenticateStudentUseCase,
  NestRegisterStudentUseCase,
  NestGetQuestionBySlugUseCase,
  NestEditQuestionUseCase,
  NestDeleteQuestionUseCase,
} from '../factories'
import { AuthenticateController } from './controllers/authenticate.controller'
import { CreateAccountController } from './controllers/create-account.controller'
import { CreateQuestionController } from './controllers/create-question.controller'
import { DeleteQuestionController } from './controllers/delete-question.controller'
import { EditQuestionController } from './controllers/edit-question.controller'
import { FetchRecentQuestionsController } from './controllers/fetch-recent-questions.controller'
import { GetQuestionBySlugController } from './controllers/get-question-by-slug.controller'

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [
    CreateAccountController,
    AuthenticateController,
    CreateQuestionController,
    FetchRecentQuestionsController,
    GetQuestionBySlugController,
    EditQuestionController,
    DeleteQuestionController
  ],
  providers: [
    PrismaService,
    NestCreateQuestionUseCase,
    NestFetchQuestionsUseCase,
    NestAuthenticateStudentUseCase,
    NestRegisterStudentUseCase,
    NestGetQuestionBySlugUseCase,
    NestEditQuestionUseCase,
    NestDeleteQuestionUseCase,
  ],
})
export class HttpModule { }
