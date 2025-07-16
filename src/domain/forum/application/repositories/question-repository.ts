import type { PaginationParams } from '@/core/repositories/pagination-params'
import type { Question } from '../../enterprise/entities/question'

export abstract class QuestionRepository {
  abstract create(question: Question): Promise<void>
  abstract findBySlug(slug: string): Promise<Question | null>
  abstract findById(id: string): Promise<Question | null>
  abstract delete(question: Question): Promise<void>
  abstract update(question: Question): Promise<void>
  abstract findManyRecent(params: PaginationParams): Promise<Question[]>
}
