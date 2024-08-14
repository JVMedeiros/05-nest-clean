import { QuestionCommentsRepository } from '@/domain/forum/application/repositories/question-comments-repository'
import { QuestionsRepository } from '@/domain/forum/application/repositories/questions-respository'
import { CommentOnQuestionUseCase } from '@/domain/forum/application/use-cases/comment-on-question'
import { Injectable } from '@nestjs/common'

@Injectable()
export class NestCommentOnQuestionUseCase extends CommentOnQuestionUseCase {
  constructor(questionsRepository: QuestionsRepository, questionCommentsRepository: QuestionCommentsRepository) {
    super(questionsRepository, questionCommentsRepository)
  }
}
