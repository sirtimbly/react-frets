import { $, $$ } from '../output-styles'

export function TextInput(field: {
  key: string
  handler: (value: string) => void
  value: string
  required: boolean
  isDirty?: () => boolean
  validate?: () => boolean
  validationErrors?: string[]
}) {
  const valid = !(field.validationErrors && field.validationErrors.length)
  return $.div.h(
    { key: field.key },
    $.label.flex.itemsCenter.flexRow.my_2.h(
      $.div.flexGrow.w_1_3
        .add(field.required && $$().fontBold.toString())
        .h(field.key),
      // $.input.bgGray_200.p_1.h({ type: "text", value: "something" })
      $.input.flexGrow.w_2_3.bgWhite.border.roundedSm.borderGray_300.ml_2.p_1.textBlack.shadowInner
        .add(
          !valid
            ? $$().bgRed_100.borderRed_500.textRed_600.border.toString()
            : ''
        )
        .h({
          value: field.value,
          onChange: (e: React.FormEvent) => {
            console.log('calling field handler')
            // TODO figure out validation again
            field.handler((e.currentTarget as HTMLInputElement).value)
            // if (field.isDirty() && (e.currentTarget as HTMLInputElement).value.length > 0) {
            // 	field.validate(e) && field.handler(e);
            // }
          },
          'aria-invalid': !valid ? 'true' : 'false',
        }),
      $.div.textXs.textRed_700.hide(valid).flexGrow.m_2.h(
        {
          role: 'alert',
        },
        !valid ? field.validationErrors?.join(', ') + '.' : ''
      )
    )
  )
}
