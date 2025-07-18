import { RegisterStudentUseCase } from './register-student'
import { InMemoryStudentRepository } from 'test/repositories/in-memory-student-repository'
import { FakeHasher } from 'test/cryptography/fake-hasher'

let fakerHasher: FakeHasher
let inMemorystudentRepository: InMemoryStudentRepository
let sut: RegisterStudentUseCase

describe('Register Student', () => {
  beforeEach(() => {
    inMemorystudentRepository = new InMemoryStudentRepository()
    fakerHasher = new FakeHasher()
    sut = new RegisterStudentUseCase(inMemorystudentRepository, fakerHasher)
  })

  it('Should be able to register student', async () => {
    const result = await sut.execute({
      name: 'john doe',
      email: 'johndoe@example.com',
      password: '123456',
    })

    expect(result.isRight()).toBeTruthy()
    expect(result.value).toEqual({
      student: inMemorystudentRepository.items[0],
    })
  })

  it('Should hash student password upon registration', async () => {
    const result = await sut.execute({
      name: 'john doe',
      email: 'johndoe@example.com',
      password: '123456',
    })

    expect(result.isRight()).toBeTruthy()
    expect(inMemorystudentRepository.items[0].password).toEqual('123456-hashed')
  })
})
