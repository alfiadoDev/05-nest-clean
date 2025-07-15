import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import {
  Question,
  type QuestionProps,
} from '@/domain/forum/enterprise/entities/question'
import { faker } from '@faker-js/faker'

export function makeQuestion(
  override: Partial<QuestionProps> = {},
  id?: UniqueEntityId,
) {
  const newQuestion = Question.create(
    {
      title: faker.lorem.sentence(),
      authorId: new UniqueEntityId('1'),
      content: faker.lorem.text(),
      ...override,
    },
    id,
  )

  return newQuestion
}
