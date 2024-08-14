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
  NestAnswerQuestionUseCase,
  NestEditAnswerUseCase,
  NestDeleteAnswerUseCase,
  NestFetchQuestionAnswersUseCase,
  NestChooseQuestionBestAnswerUseCase,
  NestCommentOnQuestionUseCase,
  NestDeleteQuestionCommentUseCase,
  NestCommentOnAnswerUseCase,
} from '../factories'
import { AnswerQuestionController } from './controllers/answer-question.controller'
import { AuthenticateController } from './controllers/authenticate.controller'
import { ChooseQuestionBestAnswerController } from './controllers/choose-question-best-answer.controller'
import { CommentOnAnswerController } from './controllers/comment-on-answer.controller'
import { CommentOnQuestionController } from './controllers/comment-on-question.controller'
import { CreateAccountController } from './controllers/create-account.controller'
import { CreateQuestionController } from './controllers/create-question.controller'
import { DeleteAnswerController } from './controllers/delete-answer.controller'
import { DeleteQuestionCommentController } from './controllers/delete-question-comment.controller'
import { DeleteQuestionController } from './controllers/delete-question.controller'
import { EditAnswerController } from './controllers/edit-answer.controller'
import { EditQuestionController } from './controllers/edit-question.controller'
import { FetchQuestionAnswerController } from './controllers/fetch-question-answers.controller'
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
    DeleteQuestionController,
    AnswerQuestionController,
    EditAnswerController,
    DeleteAnswerController,
    FetchQuestionAnswerController,
    ChooseQuestionBestAnswerController,
    CommentOnQuestionController,
    DeleteQuestionCommentController,
    CommentOnAnswerController,
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
    NestAnswerQuestionUseCase,
    NestEditAnswerUseCase,
    NestDeleteAnswerUseCase,
    NestFetchQuestionAnswersUseCase,
    NestChooseQuestionBestAnswerUseCase,
    NestCommentOnQuestionUseCase,
    NestDeleteQuestionCommentUseCase,
    NestCommentOnAnswerUseCase
  ],
})
export class HttpModule { }
