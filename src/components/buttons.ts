import { $$ } from '../tailwind-styles'
import BaseStyles from '../tailwind-styles'

export default class Button {
  constructor(private tag: string = 'button') {}
  private selector = $$(
    this.tag
  ).py_1.px_3.roundedSm.flex.justifyAround.capitalize.cursorPointer.selectNone.ringBlue_200.toSelector()

  get primary(): BaseStyles {
    return $$(this.selector).injectProps<HTMLLinkElement>(
      this.tag === 'a' ? { href: '#/' } : {}
    ).bgBlue_600.hoverBgBlue_800.border.borderBlue_900.textWhite
  }

  get secondary(): BaseStyles {
    return $$(this.selector).injectProps<HTMLLinkElement>(
      this.tag === 'a' ? { href: '#/' } : {}
    ).bgBlue_200.border.borderBlue_400.hoverBgBlue_400.textBlue_900
      .hoverTextWhite
  }
  get tertiary(): BaseStyles {
    return $$(this.selector).injectProps<HTMLLinkElement>(
      this.tag === 'a' ? { href: '#/' } : {}
    ).bgGray_200.border.borderBlue_800.hoverBgGray_600.textBlue_900
      .hoverTextWhite
  }
}

export const $Button = (tag?: 'a' | 'button'): Button => {
  return new Button(tag)
}

export const $LinkBtn = $Button('a')
export const $Btn = $Button('button')
