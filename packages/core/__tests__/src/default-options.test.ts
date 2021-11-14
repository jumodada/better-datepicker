import defaultOptions from '../../src/store/default-options'

describe('default-options', () => {
  test('default-options', () => {
    expect(defaultOptions()).toMatchSnapshot()
  })
})
