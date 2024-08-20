import { AnswersRepository } from '@/domain/forum/application/repositories/answers-repository'
import { OnQuestionBestAnswerChosen } from '@/domain/notification/application/subscribers/on-question-best-answer-chosen'
import { Injectable } from '@nestjs/common'
import { NestSendNotificationUseCase } from './nest-send-notification-use-case'

@Injectable()
export class NestOnQuestionBestAnswerChosen extends OnQuestionBestAnswerChosen {
  constructor(answersRepository: AnswersRepository, sendNotification: NestSendNotificationUseCase,) {
    super(answersRepository, sendNotification)
  }
}
