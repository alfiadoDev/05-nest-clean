import { InMemoryNotificationRepository } from 'test/repositories/in-memory-notifcation-repository'
import { ReadNotificationUseCase } from './read-notification'
import { makeNotification } from 'test/factories/make-notification'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

let inMemoryNotificationRepository: InMemoryNotificationRepository
let sut: ReadNotificationUseCase

describe('Read Notification', () => {
  beforeEach(() => {
    inMemoryNotificationRepository = new InMemoryNotificationRepository()
    sut = new ReadNotificationUseCase(inMemoryNotificationRepository)
  })

  it('Should be able to read an notification', async () => {
    await inMemoryNotificationRepository.create(
      makeNotification(
        { recipientId: new UniqueEntityId('recipient-1') },
        new UniqueEntityId('1'),
      ),
    )

    const result = await sut.execute({
      recipientId: 'recipient-1',
      notificationId: '1',
    })

    expect(result.isRight()).toBeTruthy()
    expect(inMemoryNotificationRepository.items[0].readAt).toBeTruthy()
  })

  it('Should not be able to read an notification with another user', async () => {
    await inMemoryNotificationRepository.create(
      makeNotification(
        { recipientId: new UniqueEntityId('recipient-1') },
        new UniqueEntityId('1'),
      ),
    )

    const result = await sut.execute({
      recipientId: 'recipient-2',
      notificationId: '1',
    })

    expect(result.isLeft()).toBeTruthy()
    expect(inMemoryNotificationRepository.items[0].readAt).toBeFalsy()
  })
})
