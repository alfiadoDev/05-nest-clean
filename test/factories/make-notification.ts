import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import {
  Notification,
  type NotificationProps,
} from '@/domain/notification/enterprise/entities/notification'
import { faker } from '@faker-js/faker'

export function makeNotification(
  override: Partial<NotificationProps> = {},
  id?: UniqueEntityId,
) {
  const newNotification = Notification.create(
    {
      title: faker.lorem.sentence(),
      recipientId: new UniqueEntityId('1'),
      content: faker.lorem.text(),
      ...override,
    },
    id,
  )

  return newNotification
}
