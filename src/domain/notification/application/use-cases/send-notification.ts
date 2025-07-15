import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { right, type Either } from '@/core/either'
import { Notification } from '../../enterprise/entities/notification'
import type { NotificationRepository } from '../repositories/notification-repository'

export interface SendNotificationUseCaseRequest {
  recipientId: string
  title: string
  content: string
}

export type SendNotificationUseCaseResponse = Either<
  null,
  {
    notification: Notification
  }
>

export class SendNotificationUseCase {
  // eslint-disable-next-line prettier/prettier
  constructor(private notificationRepository: NotificationRepository) { }

  async execute({
    recipientId,
    title,
    content,
  }: SendNotificationUseCaseRequest): Promise<SendNotificationUseCaseResponse> {
    const notification = Notification.create({
      recipientId: new UniqueEntityId(recipientId),
      title,
      content,
    })

    await this.notificationRepository.create(notification)

    return right({
      notification,
    })
  }
}
