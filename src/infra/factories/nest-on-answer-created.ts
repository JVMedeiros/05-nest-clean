import { QuestionsRepository } from '@/domain/forum/application/repositories/questions-repository'
import { OnAnswerCreated } from '@/domain/notification/application/subscribers/on-answer-created'
import { Injectable } from '@nestjs/common'
import { NestSendNotificationUseCase } from './nest-send-notification-use-case'

@Injectable()
export class NestOnAnswerCreated extends OnAnswerCreated {
  constructor(questionsRepository: QuestionsRepository, sendNotification: NestSendNotificationUseCase) {
    super(questionsRepository, sendNotification)
  }
}
