import baretest from 'baretest'
import { Baretest } from '../src/typings/baretest'

import configureAppTest from './app.spec'

const test: Baretest = baretest('Render App')
configureAppTest(test)

!(async function () {
  await test.run()
  process.exit()
})()
