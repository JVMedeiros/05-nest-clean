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
  NestDeleteAnswerCommentUseCase,
  NestFetchQuestionCommentsUseCase,
  NestFetchAnswerCommentsUseCase,
  NestUploadAndCreateAttachmentUseCase,
  NestReadNotificationUseCase,
} from '../factories'
import { StorageModule } from '../storage/storage.module'
import { AnswerQuestionController } from './controllers/answer-question.controller'
import { AuthenticateController } from './controllers/authenticate.controller'
import { ChooseQuestionBestAnswerController } from './controllers/choose-question-best-answer.controller'
import { CommentOnAnswerController } from './controllers/comment-on-answer.controller'
import { CommentOnQuestionController } from './controllers/comment-on-question.controller'
import { CreateAccountController } from './controllers/create-account.controller'
import { CreateQuestionController } from './controllers/create-question.controller'
import { DeleteAnswerCommentController } from './controllers/delete-answer-comment.controller'
import { DeleteAnswerController } from './controllers/delete-answer.controller'
import { DeleteQuestionCommentController } from './controllers/delete-question-comment.controller'
import { DeleteQuestionController } from './controllers/delete-question.controller'
import { EditAnswerController } from './controllers/edit-answer.controller'
import { EditQuestionController } from './controllers/edit-question.controller'
import { FetchAnswerCommentsController } from './controllers/fetch-answer-comments.controller'
import { FetchQuestionAnswerController } from './controllers/fetch-question-answers.controller'
import { FetchQuestionCommentsController } from './controllers/fetch-question-comments.controller'
import { FetchRecentQuestionsController } from './controllers/fetch-recent-questions.controller'
import { GetQuestionBySlugController } from './controllers/get-question-by-slug.controller'
import { ReadNotificationController } from './controllers/read-notification.controller'
import { UploadAttachmentController } from './controllers/upload-attachment.controller'

@Module({
  imports: [DatabaseModule, CryptographyModule, StorageModule],
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
    DeleteAnswerCommentController,
    FetchQuestionCommentsController,
    FetchAnswerCommentsController,
    UploadAttachmentController,
    ReadNotificationController
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
    NestCommentOnAnswerUseCase,
    NestDeleteAnswerCommentUseCase,
    NestFetchQuestionCommentsUseCase,
    NestFetchAnswerCommentsUseCase,
    NestUploadAndCreateAttachmentUseCase,
    NestReadNotificationUseCase
  ],
})
export class HttpModule { }
