import { InMemoryNotificationRepository } from 'test/repositories/in-memory-notifcation-repository'
import { SendNotificationUseCase } from './send-notification'

let inMemoryNotificationRepository: InMemoryNotificationRepository
let sut: SendNotificationUseCase

describe('Create Notification', () => {
  beforeEach(() => {
    inMemoryNotificationRepository = new InMemoryNotificationRepository()
    sut = new SendNotificationUseCase(inMemoryNotificationRepository)
  })

  it('Should be able to create an notification', async () => {
    const result = await sut.execute({
      recipientId: '1',
      title: 'Nova Notificacao',
      content: 'Conteudo da nova notificacao',
    })

    expect(result.isRight()).toBeTruthy()
    expect(inMemoryNotificationRepository.items).toHaveLength(1)
  })
})
