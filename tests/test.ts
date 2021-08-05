import baretest from 'baretest'
import { Baretest } from '../src/typings/baretest'

const test: Baretest = baretest('Render App')

// A big ol' list of tests to set up and run
// import new tests and call them here
import configureAppTest from './app.spec'
configureAppTest(test)

!(async function () {
  await test.run()
  process.exit()
})()
