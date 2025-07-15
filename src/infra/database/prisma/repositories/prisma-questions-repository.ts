import type { PaginationParams } from '@/core/repositories/pagination-params'
import type { QuestionRepository } from '@/domain/forum/application/repositories/question-repository'
import type { Question } from '@/domain/forum/enterprise/entities/question'
import { Injectable } from '@nestjs/common'

@Injectable()
export class PrismaQuestionsRepository implements QuestionRepository {
  async create(question: Question): Promise<void> {
    throw new Error('Method not implemented.')
  }

  async findBySlug(slug: string): Promise<Question | null> {
    throw new Error('Method not implemented.')
  }

  async findById(id: string): Promise<Question | null> {
    throw new Error('Method not implemented.')
  }

  async delete(question: Question): Promise<void> {
    throw new Error('Method not implemented.')
  }

  async update(question: Question): Promise<void> {
    throw new Error('Method not implemented.')
  }

  async findManyRecent(params: PaginationParams): Promise<Question[]> {
    throw new Error('Method not implemented.')
  }
}
