import { it, describe, expect } from 'vitest'
import { Slug } from './slug'

describe('Slug value object', () => {
  it('Should be able to create a new slug from text', () => {
    const slug = Slug.createFromText('Example question title')

    expect(slug.value).toEqual('example-question-title')
  })
})
