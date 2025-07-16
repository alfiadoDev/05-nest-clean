import { left, right, type Either } from '@/core/either'
import { Injectable } from '@nestjs/common'
import { StudentRepository } from '../repositories/student-repository'
import { HashCompare } from '../cryptography/hash-compare'
import { Encrypter } from '../cryptography/encrypter'
import { WrongCredentialsError } from './errors/wrong-credentials-error'

interface AuthenticateStudentUseCaseRequest {
  email: string
  password: string
}

type AuthenticateStudentUseCaseResponse = Either<
  WrongCredentialsError,
  {
    accessToken: string
  }
>

@Injectable()
export class AuthenticateStudentUseCase {
  // eslint-disable-next-line prettier/prettier
  constructor(
    private studentRepository: StudentRepository,
    private hashCompare: HashCompare,
    private encypter: Encrypter,
    // eslint-disable-next-line prettier/prettier
  ) { }

  async execute({
    email,
    password,
  }: AuthenticateStudentUseCaseRequest): Promise<AuthenticateStudentUseCaseResponse> {
    const student = await this.studentRepository.findByEmail(email)

    if (!student) return left(new WrongCredentialsError())

    const isPasswordvalid = await this.hashCompare.compare(
      password,
      student.password,
    )

    if (!isPasswordvalid) return left(new WrongCredentialsError())

    const accessToken = await this.encypter.encrypt({
      sub: student.id.toString(),
    })

    return right({ accessToken })
  }
}
