import assert from 'assert'
import { Baretest } from '../src/typings/baretest'
import { render } from 'react-dom'
import utils from 'react-dom/test-utils'
import { setup } from './helpers/setup'

import { AppComponent } from '../src/app'

import { findByTagAndText } from './helpers/find'

export default async (test: Baretest): Promise<void> => {
  test('should render login and toggle view when submitted ', () => {
    const rootContainer = setup()

    render(
      AppComponent({ fancyName: 'hello world', isVisible: true }),
      rootContainer
    )

    assert.ok(rootContainer)

    const button0 = rootContainer.querySelector('button')

    const form = rootContainer.querySelector('form')
    assert.ok(form)
    assert.deepStrictEqual(button0?.innerHTML, 'Log In')
    utils.Simulate.submit(form)

    const button1 = findByTagAndText(rootContainer, 'button', 'Clear')
    assert.ok(button1)
  })
  test('should return hello world', () => {
    const rootContainer = setup()

    render(
      AppComponent({ fancyName: 'hello world', isVisible: true }),
      rootContainer
    )

    assert.ok(rootContainer)
    const header = rootContainer.querySelector('header')
    assert.ok(header)
    assert.strictEqual(header.textContent, 'hello world')
  })
  test('should hide hello world when not visible', () => {
    const rootContainer = setup()

    render(
      AppComponent({ fancyName: 'hello world', isVisible: false }),
      rootContainer
    )
    assert.ok(rootContainer)
    const header = rootContainer.querySelector('header')
    assert.strictEqual(header, null)
  })
}
