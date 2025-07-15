import type { NotificationRepository } from '@/domain/notification/application/repositories/notification-repository'
import type { Notification } from '@/domain/notification/enterprise/entities/notification'

export class InMemoryNotificationRepository implements NotificationRepository {
  public items: Notification[] = []

  async create(notification: Notification): Promise<void> {
    this.items.push(notification)
  }

  async findById(id: string): Promise<Notification | null> {
    const notifcation = this.items.find((item) => item.id.toString() === id)

    return notifcation ?? null
  }

  async save(notification: Notification): Promise<void> {
    const index = this.items.findIndex((item) => item.id === notification.id)

    this.items[index] = notification
  }
}
