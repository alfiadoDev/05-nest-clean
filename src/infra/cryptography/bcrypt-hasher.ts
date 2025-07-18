import type { HashCompare } from '@/domain/forum/application/cryptography/hash-compare'
import type { HashGenerator } from '@/domain/forum/application/cryptography/hash-generator'
import { compare, hash } from 'bcryptjs'

export class BcryptHasher implements HashGenerator, HashCompare {
  async hash(plain: string): Promise<string> {
    return await hash(plain, 8)
  }

  async compare(plain: string, hash: string): Promise<boolean> {
    return await compare(plain, hash)
  }
}
