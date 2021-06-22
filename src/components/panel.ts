import { $$ } from '../output-styles'
import BaseStyles from '../output-styles'

export default class Panel {
  constructor(private tag: string = 'section') {}
  private selector = $$('section').p_3.my_2.rounded.border.toSelector()
  get white(): BaseStyles {
    return $$(this.selector).bgGray_100.borderGray_200
  }
  get light(): BaseStyles {
    return $$(this.selector).bgGray_200.borderGray_300
  }
  get med(): BaseStyles {
    return $$(this.selector).bgGray_300.borderGray_400
  }
  get dark(): BaseStyles {
    return $$(this.selector).bgGray_400.borderGray_500
  }
}

export const $Panel = new Panel()
