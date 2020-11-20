import { $$ } from "../output-styles";
import BaseStyles from "../output-styles";
const tag = "a";
const base = (node: BaseStyles) =>
  node.p_2.px_3.roundedFull.flex.justifyAround.capitalize.cursorPointer;
export const LinkButton = {
  primary: base($$(tag)).bgBlue_600.hoverBgBlue_800.textWhite,
  secondary: base($$(tag)).bgBlue_300.hoverBgBlue_500.textBlue_900,
};
