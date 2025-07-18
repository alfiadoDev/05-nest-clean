import { Encrypter } from '@/domain/forum/application/cryptography/encrypter'
import { Module } from '@nestjs/common'
import { JwtEncrypter } from './jwt-encrypter'
import { HashGenerator } from '@/domain/forum/application/cryptography/hash-generator'
import { BcryptHasher } from './bcrypt-hasher'
import { HashCompare } from '@/domain/forum/application/cryptography/hash-compare'

@Module({
  providers: [
    { provide: Encrypter, useClass: JwtEncrypter },
    { provide: HashGenerator, useClass: BcryptHasher },
    { provide: HashCompare, useClass: BcryptHasher },
  ],

  exports: [Encrypter, HashGenerator, HashCompare],
})
// eslint-disable-next-line prettier/prettier
export class CryptographyModule { }
