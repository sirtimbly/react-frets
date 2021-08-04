import assert from 'assert'
import { Baretest } from '../src/typings/baretest'
import { render } from 'react-dom'
import { act } from 'react-dom/test-utils'
import { setup } from './helpers/setup'

import { AppComponent } from '../src/app'

export default async (test: Baretest): Promise<void> => {
  test('should return hello world', () => {
    const rootContainer = setup()

    act(() => {
      render(
        AppComponent({ fancyName: 'hello world', isVisible: true }),
        rootContainer
      )
    })
    assert.ok(rootContainer)
    const header = rootContainer.querySelector('header')
    assert.ok(header)
    assert.strictEqual(header.textContent, 'hello world')
  })
  test('should hide hello world when not visible', () => {
    const rootContainer = setup()

    act(() => {
      render(
        AppComponent({ fancyName: 'hello world', isVisible: false }),
        rootContainer
      )
    })
    assert.ok(rootContainer)
    const header = rootContainer.querySelector('header')
    assert.strictEqual(header, null)
  })
}
