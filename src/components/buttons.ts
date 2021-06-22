import { $$ } from '../output-styles'
import BaseStyles from '../output-styles'

export default class Button {
  constructor(private tag: string = 'a') {}
  private selector = $$(
    this.tag
  ).py_1.px_3.roundedSm.flex.justifyAround.capitalize.cursorPointer.selectNone.ringBlue_200.toSelector()

  get primary(): BaseStyles {
    return $$(this.selector).injectProps(
      this.tag === 'a' ? { href: '#voidish' } : {}
    ).bgBlue_600.hoverBgBlue_800.border.borderBlue_900.textWhite
  }

  get secondary(): BaseStyles {
    return $$(this.selector).injectProps(
      this.tag === 'a' ? { href: '#voidish' } : {}
    ).bgBlue_200.border.borderBlue_400.hoverBgBlue_400.textBlue_900
      .hoverTextWhite
  }
  get tertiary(): BaseStyles {
    return $$(this.selector).injectProps(
      this.tag === 'a' ? { href: '#voidish' } : {}
    ).bgGray_200.border.borderBlue_800.hoverBgGray_600.textBlue_900
      .hoverTextWhite
  }
}

export const $Button = (tag?: 'a' | 'button'): Button => {
  return new Button(tag)
}

export const $LinkBtn = $Button('a')
export const $Btn = $Button('button')
