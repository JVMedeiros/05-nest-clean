import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found'
import { makeNotification } from 'test/factories/make-notification'
import { InMemoryNotificationsRepository } from 'test/repositories/in-memory-notifications-repository'
import { expect } from 'vitest'
import { ReadNotificationUseCase } from './read-notification'

let inMemoryNotificationsRepository: InMemoryNotificationsRepository
let sut: ReadNotificationUseCase

describe('Read Notification', () => {
  beforeEach(() => {
    inMemoryNotificationsRepository = new InMemoryNotificationsRepository()
    sut = new ReadNotificationUseCase(inMemoryNotificationsRepository)
  })
  it('Should be able to read a notification', async () => {
    const notification = makeNotification()
    await inMemoryNotificationsRepository.create(notification)

    const result = await sut.execute({
      recipientId: notification.recipientId.toString(),
      notificationId: notification.id.toString(),
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryNotificationsRepository.items[0].readAt).toEqual(
      expect.any(Date),
    )
  })

  it('Should not be able to read an notification from another recipient', async () => {
    const notification = makeNotification({
      recipientId: new UniqueEntityID('recipient-1'),
    })
    await inMemoryNotificationsRepository.create(notification)

    const result = await sut.execute({
      recipientId: 'recipient-2',
      notificationId: notification.id.toString(),
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })

  it('Should not be able to read an inexistent notification', async () => {
    const notification = makeNotification(
      {},
      new UniqueEntityID('notification-1'),
    )
    await inMemoryNotificationsRepository.create(notification)

    const result = await sut.execute({
      recipientId: notification.recipientId.toString(),
      notificationId: 'notification-2',
    })
    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })
})
