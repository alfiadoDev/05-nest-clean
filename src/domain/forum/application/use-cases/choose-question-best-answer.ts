import type { AnswersRepository } from '../repositories/answers-repository'
import type { Question } from '../../enterprise/entities/question'
import type { QuestionRepository } from '../repositories/question-repository'
import { left, right, type Either } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/resources-not-found-error'
import { NotAllowedError } from '@/core/errors/not-allowed-error'

interface ChooseQuestionBestAnswerUseCaseRequest {
  authorQuestionId: string
  answerId: string
}

type ChooseQuestionBestAnswerUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  { question: Question }
>

export class ChooseQuestionBestAnswerUseCase {
  constructor(
    private answersRepository: AnswersRepository,
    private questionRepository: QuestionRepository,
    // eslint-disable-next-line prettier/prettier
  ) { }

  async execute({
    answerId,
    authorQuestionId,
  }: ChooseQuestionBestAnswerUseCaseRequest): Promise<ChooseQuestionBestAnswerUseCaseResponse> {
    const answer = await this.answersRepository.findById(answerId)

    if (!answer) return left(new ResourceNotFoundError())

    const question = await this.questionRepository.findById(
      answer.questionId.toString(),
    )
    if (!question) return left(new ResourceNotFoundError())

    if (authorQuestionId !== question.authorId.toString())
      return left(new NotAllowedError())

    question.bestAnswerId = answer.id

    await this.questionRepository.update(question)

    return right({ question })
  }
}
