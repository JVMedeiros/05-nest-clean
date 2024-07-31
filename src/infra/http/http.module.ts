import { Module } from '@nestjs/common'
import { DatabaseModule } from '../database/database.module'
import { PrismaService } from '../database/prisma/prisma.service'
import { NestCreateQuestionUseCase, NestFetchQuestionsUseCase } from '../factories'
import { AuthenticateController } from './controllers/authenticate.controller'
import { CreateAccountController } from './controllers/create-account.controller'
import { CreateQuestionController } from './controllers/create-question.controller'
import { FetchRecentQuestionsController } from './controllers/fetch-recent-questions.controller'

@Module({
  imports: [DatabaseModule],
  controllers: [
    CreateAccountController,
    AuthenticateController,
    CreateQuestionController,
    FetchRecentQuestionsController,
  ],
  providers: [PrismaService, NestCreateQuestionUseCase, NestFetchQuestionsUseCase],
})
export class HttpModule { }
