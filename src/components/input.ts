import { $, $$ } from "../output-styles";

export function TextInput(field: {
  key: string;
  handler: (value: string) => void;
  value: string;
  isDirty?: () => boolean;
  validate?: () => boolean;
  validationErrors?: [];
}) {
  return $.div.h(
    { key: field.key },
    $.label.flex.itemsCenter.flexRow.flexNoWrap.m_1.h(
      $.div.flexGrow.w_1_3.h(field.key)
      // $.input.flexGrow.w_2_3.bgGray_200.ml_2.p_1.textBlack.rounded.h({
      //   className:
      //     field.validationErrors && field.validationErrors.length > 0
      //       ? $.border.borderRed_600.toString()
      //       : "",
      //   value: field.value,
      //   onChange: (e: React.FormEvent) => {
      //     console.log("calling field handler");
      //     // TODO figure out validation again
      //     field.handler((e.currentTarget as HTMLInputElement).value);
      //     // if (field.isDirty() && (e.currentTarget as HTMLInputElement).value.length > 0) {
      //     // 	field.validate(e) && field.handler(e);
      //     // }
      //   },
      //   "aria-invalid":
      //     field.validationErrors && field.validationErrors?.length > 0
      //       ? "true"
      //       : "false"
      // })
    ),
    $.span.textXs.textRed_700.h(
      {
        role: "alert"
      },

      field.validationErrors && field.validationErrors.length > 0
        ? field.validationErrors?.join(", ") + "."
        : ""
    )
  );
}
