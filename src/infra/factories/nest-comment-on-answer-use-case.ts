import { AnswerCommentsRepository } from '@/domain/forum/application/repositories/answer-comments-repository'
import { AnswersRepository } from '@/domain/forum/application/repositories/answers-repository'
import { QuestionCommentsRepository } from '@/domain/forum/application/repositories/question-comments-repository'
import { QuestionsRepository } from '@/domain/forum/application/repositories/questions-repository'
import { CommentOnAnswerUseCase } from '@/domain/forum/application/use-cases/comment-on-answer'
import { CommentOnQuestionUseCase } from '@/domain/forum/application/use-cases/comment-on-question'
import { Injectable } from '@nestjs/common'

@Injectable()
export class NestCommentOnAnswerUseCase extends CommentOnAnswerUseCase {
  constructor(answersRepository: AnswersRepository, answerCommentsRepository: AnswerCommentsRepository) {
    super(answersRepository, answerCommentsRepository)
  }
}
