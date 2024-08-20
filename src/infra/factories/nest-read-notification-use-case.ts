import { NotificationsRepository } from '@/domain/notification/application/repositories/notifications-repository'
import { ReadNotificationUseCase } from '@/domain/notification/application/use-cases/read-notification'
import { Injectable } from '@nestjs/common'

@Injectable()
export class NestReadNotificationUseCase extends ReadNotificationUseCase {
  constructor(notificationsRepository: NotificationsRepository) {
    super(notificationsRepository)
  }
}
