import * as prefixName from '../../src/utils/prefixName'

describe('classes', () => {
  test('produces classnames of the Datepicker', () => {
    expect(prefixName).toMatchSnapshot()
  })
})
