import { left, right, type Either } from '@/core/either'
import { Question } from '../../enterprise/entities/question'
import type { QuestionRepository } from '../repositories/question-repository'
import { ResourceNotFoundError } from '@/core/errors/resources-not-found-error'

interface GetQuestionBySlugUseCaseRequest {
  slug: string
}

type GetQuestionBySlugUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    question: Question
  }
>

export class GetQuestionBySlugUseCase {
  // eslint-disable-next-line prettier/prettier
  constructor(private questionRepository: QuestionRepository) { }

  async execute({
    slug,
  }: GetQuestionBySlugUseCaseRequest): Promise<GetQuestionBySlugUseCaseResponse> {
    const question = await this.questionRepository.findBySlug(slug)

    if (!question) return left(new ResourceNotFoundError())

    return right({
      question,
    })
  }
}
