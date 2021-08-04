import { compiler } from 'markdown-to-jsx'
import { ReactElement } from 'react'

export const md = (strings: TemplateStringsArray): ReactElement => {
  return compiler(strings.join(' ')) as ReactElement
}
