import { InMemoryStudentRepository } from 'test/repositories/in-memory-student-repository'
import { FakeHasher } from 'test/cryptography/fake-hasher'
import { AuthenticateStudentUseCase } from './authenticate-student'
import { FakerEncrypter } from 'test/cryptography/fake-encrypter'
import { makeStudent } from 'test/factories/make-student'

let fakerHasher: FakeHasher
let inMemorystudentRepository: InMemoryStudentRepository
let fakeEncrypter: FakerEncrypter
let sut: AuthenticateStudentUseCase

describe('Authenticate Student', () => {
  beforeEach(() => {
    inMemorystudentRepository = new InMemoryStudentRepository()
    fakerHasher = new FakeHasher()
    fakeEncrypter = new FakerEncrypter()
    sut = new AuthenticateStudentUseCase(
      inMemorystudentRepository,
      fakerHasher,
      fakeEncrypter,
    )
  })

  it('Should be able to authenticate a student', async () => {
    const student = makeStudent({
      email: 'johndoe@example.com',
      password: await fakerHasher.hash('123456'),
    })

    inMemorystudentRepository.items.push(student)

    const result = await sut.execute({
      email: 'johndoe@example.com',
      password: '123456',
    })

    expect(result.isRight()).toBeTruthy()
    expect(result.value).toEqual({
      accessToken: expect.any(String),
    })
  })
})
