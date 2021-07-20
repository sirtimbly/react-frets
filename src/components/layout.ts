import { $, $$ } from '../tailwind-styles'
import { ReactElement } from 'react'
import { map } from 'lodash/fp'
import BaseStyles from '../tailwind-styles'

export function FlowWrap<T>(mapper?: (item: T) => ReactElement) {
  return (...items: T[]) =>
    $.div.flex.flexWrap.h(...(mapper ? map(mapper)(items) : items))
}

export function FlowCol<T>(mapper?: (item: T) => ReactElement) {
  return (...items: T[]) =>
    $.div.flex.flexCol.itemsStretch.h(...(mapper ? map(mapper)(items) : items))
}

export function FlowRow<T>(mapper?: (item: T) => ReactElement) {
  return (...items: T[]) =>
    $.div.rowX.justifyStart.h(...(mapper ? map(mapper)(items) : items))
}

export function FlowRowSpread<T>(mapper?: (item: T) => ReactElement) {
  return (...items: T[]) =>
    $.div.rowX.h(...(mapper ? map(mapper)(items) : items))
}

export function FlowRowPack(
  mapper?: (item: ReactElement | string) => ReactElement
) {
  return (...items: Array<ReactElement | string>) =>
    $.div.flex.flexRow.flexNowrap.itemsStretch.h(
      ...(mapper ? map(mapper)(items) : items)
    )
}

export const Row = $.div.rowX.h

export const flex = () => $.div.flex
