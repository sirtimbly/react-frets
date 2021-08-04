import 'jsdom-global/register'
import raf from 'raf'
export function setup(): HTMLElement | null {
  raf.polyfill()
  const appDiv = window.document.createElement('div')
  appDiv.id = 'app'
  window.document.body.appendChild(appDiv)
  return window.document.getElementById('app')
}
