import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import {
  Answer,
  type AnswerProps,
} from '@/domain/forum/enterprise/entities/answer'
import { faker } from '@faker-js/faker'

export function makeAnswer(
  override: Partial<AnswerProps>,
  id?: UniqueEntityId,
) {
  const object = {
    authorId: new UniqueEntityId(),
    content: faker.lorem.text(),
    questionId: new UniqueEntityId(),
    ...override,
  }
  const newAnswer = Answer.create(object, id)
  return newAnswer
}
