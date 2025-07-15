import { Slug } from './slug'

test('Should be able to create a new slug fromtest', () => {
  const slug = Slug.createFromValue('Example question title')

  expect(slug.value).toEqual('example-question-title')
})
