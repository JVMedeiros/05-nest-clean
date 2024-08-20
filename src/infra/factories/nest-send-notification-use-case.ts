import { NotificationsRepository } from '@/domain/notification/application/repositories/notifications-repository'
import { SendNotificationUseCase } from '@/domain/notification/application/use-cases/send-notification'
import { Injectable } from '@nestjs/common'

@Injectable()
export class NestSendNotificationUseCase extends SendNotificationUseCase {
  constructor(notificationsRepository: NotificationsRepository) {
    super(notificationsRepository)
  }
}
