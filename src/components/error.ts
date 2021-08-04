import { $ } from '../tailwind-styles'
import { ReactElement } from 'react'

export function error(val?: string): ReactElement | string {
  return val
    ? $.div.rounded.textRed_500.borderRed_500.border.minWFull.p_2.mb_2.textWhite.h(
        val
      )
    : ''
}
