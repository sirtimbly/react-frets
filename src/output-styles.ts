
import React, {
  ReactNode,
  ReactElement,
  HTMLAttributes,
  AllHTMLAttributes,
  Props
} from "react";

type hFn<T> = (
  children: Array<ReactNode | AllHTMLAttributes<T>>
) => ReactElement;

export const e = React.createElement;

export default class BaseStyles {
  public chain: string[];

  public conditions: boolean[] = [];
  public classProps: any = {};
  private readConditionIndex: number = 0;
  private classObjectMode: boolean = false;

  constructor(selector: string) {
    this.chain = new Array<string>();
    if (selector.length > 0) {
      this.chain.push(selector);
    }
    return this;
  }

  // The first element in the arguments might be a attributes object, or they might all be Nodes
  public h = <T>(
    ...children: Array<ReactElement | string | AllHTMLAttributes<T> | Props<T>>
  ): ReactElement => {
    if (
      children[0] &&
      typeof children[0] === "object" &&
      !Array.isArray(children[0]) &&
      !(children[0] as ReactElement).type
    ) {
      return e(
        this.elementTag,
        {
          className: this.toString(),
          ...(children[0] as HTMLAttributes<T>)
        },
        ...(children.slice(1) as Array<ReactElement>)
      );
    }
    return e(
      this.elementTag,
      { className: this.toString() },
      ...(children as Array<ReactElement>)
    );
  };

  public toObj = () => {
    if (!this.classObjectMode) {
      // tslint:disable-next-line:max-line-length
      throw Error(
        "You need to call at least one conditional method in order to use this as a classes object generator"
      );
    }
    return this.classProps;
  };

  get elementTag(): string {
    return this.chain[0] || "div";
  }

  get div(): BaseStyles {
    return new BaseStyles("div");
  }
  get img(): BaseStyles {
    return new BaseStyles("img");
  }
  get a(): BaseStyles {
    return new BaseStyles("a");
  }
  get p(): BaseStyles {
    return new BaseStyles("p");
  }
  get ul(): BaseStyles {
    return new BaseStyles("ul");
  }
  get ol(): BaseStyles {
    return new BaseStyles("ol");
  }
  get li(): BaseStyles {
    return new BaseStyles("li");
  }
  get section(): BaseStyles {
    return new BaseStyles("section");
  }
  get header(): BaseStyles {
    return new BaseStyles("header");
  }
  get article(): BaseStyles {
    return new BaseStyles("article");
  }
  get nav(): BaseStyles {
    return new BaseStyles("nav");
  }
  get aside(): BaseStyles {
    return new BaseStyles("aside");
  }
  get span(): BaseStyles {
    return new BaseStyles("span");
  }
  get button(): BaseStyles {
    return new BaseStyles("button");
  }
  get input(): BaseStyles {
    return new BaseStyles("input");
  }
  get label(): BaseStyles {
    return new BaseStyles("label");
  }
  get select(): BaseStyles {
    return new BaseStyles("select");
  }
  get textarea(): BaseStyles {
    return new BaseStyles("textarea");
  }

  public toString = (): string => {
    if (this.classObjectMode) {
      throw Error(
        "You can't build a selector string when you are calling conditional methods"
      );
    }
    if (this.chain.length === 1) {
      return this.chain[0] || "div";
    }
    return this.chain.slice(1).join(" ");
  };

  public $ = (className: string): BaseStyles => {
    return this.add(className);
  };

  public add = (className: string): BaseStyles => {
    if (this.classObjectMode) {
      this.classProps[className] = this.conditions[this.readConditionIndex];
    } else if (className.length > 0) {
      this.chain.push(className);
    }
    return this;
  };
  get container() { return this.add("container"); }
get srOnly() { return this.add("sr-only"); }
get notSrOnly() { return this.add("not-sr-only"); }
get appearanceNone() { return this.add("appearance-none"); }
get bgFixed() { return this.add("bg-fixed"); }
get bgLocal() { return this.add("bg-local"); }
get bgScroll() { return this.add("bg-scroll"); }
get bgTransparent() { return this.add("bg-transparent"); }
get bgBlack() { return this.add("bg-black"); }
get bgWhite() { return this.add("bg-white"); }
get bgGray_100() { return this.add("bg-gray-100"); }
get bgGray_200() { return this.add("bg-gray-200"); }
get bgGray_300() { return this.add("bg-gray-300"); }
get bgGray_400() { return this.add("bg-gray-400"); }
get bgGray_500() { return this.add("bg-gray-500"); }
get bgGray_600() { return this.add("bg-gray-600"); }
get bgGray_700() { return this.add("bg-gray-700"); }
get bgGray_800() { return this.add("bg-gray-800"); }
get bgGray_900() { return this.add("bg-gray-900"); }
get bgRed_100() { return this.add("bg-red-100"); }
get bgRed_200() { return this.add("bg-red-200"); }
get bgRed_300() { return this.add("bg-red-300"); }
get bgRed_400() { return this.add("bg-red-400"); }
get bgRed_500() { return this.add("bg-red-500"); }
get bgRed_600() { return this.add("bg-red-600"); }
get bgRed_700() { return this.add("bg-red-700"); }
get bgRed_800() { return this.add("bg-red-800"); }
get bgRed_900() { return this.add("bg-red-900"); }
get bgOrange_100() { return this.add("bg-orange-100"); }
get bgOrange_200() { return this.add("bg-orange-200"); }
get bgOrange_300() { return this.add("bg-orange-300"); }
get bgOrange_400() { return this.add("bg-orange-400"); }
get bgOrange_500() { return this.add("bg-orange-500"); }
get bgOrange_600() { return this.add("bg-orange-600"); }
get bgOrange_700() { return this.add("bg-orange-700"); }
get bgOrange_800() { return this.add("bg-orange-800"); }
get bgOrange_900() { return this.add("bg-orange-900"); }
get bgYellow_100() { return this.add("bg-yellow-100"); }
get bgYellow_200() { return this.add("bg-yellow-200"); }
get bgYellow_300() { return this.add("bg-yellow-300"); }
get bgYellow_400() { return this.add("bg-yellow-400"); }
get bgYellow_500() { return this.add("bg-yellow-500"); }
get bgYellow_600() { return this.add("bg-yellow-600"); }
get bgYellow_700() { return this.add("bg-yellow-700"); }
get bgYellow_800() { return this.add("bg-yellow-800"); }
get bgYellow_900() { return this.add("bg-yellow-900"); }
get bgGreen_100() { return this.add("bg-green-100"); }
get bgGreen_200() { return this.add("bg-green-200"); }
get bgGreen_300() { return this.add("bg-green-300"); }
get bgGreen_400() { return this.add("bg-green-400"); }
get bgGreen_500() { return this.add("bg-green-500"); }
get bgGreen_600() { return this.add("bg-green-600"); }
get bgGreen_700() { return this.add("bg-green-700"); }
get bgGreen_800() { return this.add("bg-green-800"); }
get bgGreen_900() { return this.add("bg-green-900"); }
get bgTeal_100() { return this.add("bg-teal-100"); }
get bgTeal_200() { return this.add("bg-teal-200"); }
get bgTeal_300() { return this.add("bg-teal-300"); }
get bgTeal_400() { return this.add("bg-teal-400"); }
get bgTeal_500() { return this.add("bg-teal-500"); }
get bgTeal_600() { return this.add("bg-teal-600"); }
get bgTeal_700() { return this.add("bg-teal-700"); }
get bgTeal_800() { return this.add("bg-teal-800"); }
get bgTeal_900() { return this.add("bg-teal-900"); }
get bgBlue_100() { return this.add("bg-blue-100"); }
get bgBlue_200() { return this.add("bg-blue-200"); }
get bgBlue_300() { return this.add("bg-blue-300"); }
get bgBlue_400() { return this.add("bg-blue-400"); }
get bgBlue_500() { return this.add("bg-blue-500"); }
get bgBlue_600() { return this.add("bg-blue-600"); }
get bgBlue_700() { return this.add("bg-blue-700"); }
get bgBlue_800() { return this.add("bg-blue-800"); }
get bgBlue_900() { return this.add("bg-blue-900"); }
get bgIndigo_100() { return this.add("bg-indigo-100"); }
get bgIndigo_200() { return this.add("bg-indigo-200"); }
get bgIndigo_300() { return this.add("bg-indigo-300"); }
get bgIndigo_400() { return this.add("bg-indigo-400"); }
get bgIndigo_500() { return this.add("bg-indigo-500"); }
get bgIndigo_600() { return this.add("bg-indigo-600"); }
get bgIndigo_700() { return this.add("bg-indigo-700"); }
get bgIndigo_800() { return this.add("bg-indigo-800"); }
get bgIndigo_900() { return this.add("bg-indigo-900"); }
get bgPurple_100() { return this.add("bg-purple-100"); }
get bgPurple_200() { return this.add("bg-purple-200"); }
get bgPurple_300() { return this.add("bg-purple-300"); }
get bgPurple_400() { return this.add("bg-purple-400"); }
get bgPurple_500() { return this.add("bg-purple-500"); }
get bgPurple_600() { return this.add("bg-purple-600"); }
get bgPurple_700() { return this.add("bg-purple-700"); }
get bgPurple_800() { return this.add("bg-purple-800"); }
get bgPurple_900() { return this.add("bg-purple-900"); }
get bgPink_100() { return this.add("bg-pink-100"); }
get bgPink_200() { return this.add("bg-pink-200"); }
get bgPink_300() { return this.add("bg-pink-300"); }
get bgPink_400() { return this.add("bg-pink-400"); }
get bgPink_500() { return this.add("bg-pink-500"); }
get bgPink_600() { return this.add("bg-pink-600"); }
get bgPink_700() { return this.add("bg-pink-700"); }
get bgPink_800() { return this.add("bg-pink-800"); }
get bgPink_900() { return this.add("bg-pink-900"); }
get bgBottom() { return this.add("bg-bottom"); }
get bgCenter() { return this.add("bg-center"); }
get bgLeft() { return this.add("bg-left"); }
get bgLeftBottom() { return this.add("bg-left-bottom"); }
get bgLeftTop() { return this.add("bg-left-top"); }
get bgRight() { return this.add("bg-right"); }
get bgRightBottom() { return this.add("bg-right-bottom"); }
get bgRightTop() { return this.add("bg-right-top"); }
get bgTop() { return this.add("bg-top"); }
get bgRepeat() { return this.add("bg-repeat"); }
get bgNoRepeat() { return this.add("bg-no-repeat"); }
get bgRepeatX() { return this.add("bg-repeat-x"); }
get bgRepeatY() { return this.add("bg-repeat-y"); }
get bgRepeatRound() { return this.add("bg-repeat-round"); }
get bgRepeatSpace() { return this.add("bg-repeat-space"); }
get bgAuto() { return this.add("bg-auto"); }
get bgCover() { return this.add("bg-cover"); }
get bgContain() { return this.add("bg-contain"); }
get borderCollapse() { return this.add("border-collapse"); }
get borderSeparate() { return this.add("border-separate"); }
get borderTransparent() { return this.add("border-transparent"); }
get borderBlack() { return this.add("border-black"); }
get borderWhite() { return this.add("border-white"); }
get borderGray_100() { return this.add("border-gray-100"); }
get borderGray_200() { return this.add("border-gray-200"); }
get borderGray_300() { return this.add("border-gray-300"); }
get borderGray_400() { return this.add("border-gray-400"); }
get borderGray_500() { return this.add("border-gray-500"); }
get borderGray_600() { return this.add("border-gray-600"); }
get borderGray_700() { return this.add("border-gray-700"); }
get borderGray_800() { return this.add("border-gray-800"); }
get borderGray_900() { return this.add("border-gray-900"); }
get borderRed_100() { return this.add("border-red-100"); }
get borderRed_200() { return this.add("border-red-200"); }
get borderRed_300() { return this.add("border-red-300"); }
get borderRed_400() { return this.add("border-red-400"); }
get borderRed_500() { return this.add("border-red-500"); }
get borderRed_600() { return this.add("border-red-600"); }
get borderRed_700() { return this.add("border-red-700"); }
get borderRed_800() { return this.add("border-red-800"); }
get borderRed_900() { return this.add("border-red-900"); }
get borderOrange_100() { return this.add("border-orange-100"); }
get borderOrange_200() { return this.add("border-orange-200"); }
get borderOrange_300() { return this.add("border-orange-300"); }
get borderOrange_400() { return this.add("border-orange-400"); }
get borderOrange_500() { return this.add("border-orange-500"); }
get borderOrange_600() { return this.add("border-orange-600"); }
get borderOrange_700() { return this.add("border-orange-700"); }
get borderOrange_800() { return this.add("border-orange-800"); }
get borderOrange_900() { return this.add("border-orange-900"); }
get borderYellow_100() { return this.add("border-yellow-100"); }
get borderYellow_200() { return this.add("border-yellow-200"); }
get borderYellow_300() { return this.add("border-yellow-300"); }
get borderYellow_400() { return this.add("border-yellow-400"); }
get borderYellow_500() { return this.add("border-yellow-500"); }
get borderYellow_600() { return this.add("border-yellow-600"); }
get borderYellow_700() { return this.add("border-yellow-700"); }
get borderYellow_800() { return this.add("border-yellow-800"); }
get borderYellow_900() { return this.add("border-yellow-900"); }
get borderGreen_100() { return this.add("border-green-100"); }
get borderGreen_200() { return this.add("border-green-200"); }
get borderGreen_300() { return this.add("border-green-300"); }
get borderGreen_400() { return this.add("border-green-400"); }
get borderGreen_500() { return this.add("border-green-500"); }
get borderGreen_600() { return this.add("border-green-600"); }
get borderGreen_700() { return this.add("border-green-700"); }
get borderGreen_800() { return this.add("border-green-800"); }
get borderGreen_900() { return this.add("border-green-900"); }
get borderTeal_100() { return this.add("border-teal-100"); }
get borderTeal_200() { return this.add("border-teal-200"); }
get borderTeal_300() { return this.add("border-teal-300"); }
get borderTeal_400() { return this.add("border-teal-400"); }
get borderTeal_500() { return this.add("border-teal-500"); }
get borderTeal_600() { return this.add("border-teal-600"); }
get borderTeal_700() { return this.add("border-teal-700"); }
get borderTeal_800() { return this.add("border-teal-800"); }
get borderTeal_900() { return this.add("border-teal-900"); }
get borderBlue_100() { return this.add("border-blue-100"); }
get borderBlue_200() { return this.add("border-blue-200"); }
get borderBlue_300() { return this.add("border-blue-300"); }
get borderBlue_400() { return this.add("border-blue-400"); }
get borderBlue_500() { return this.add("border-blue-500"); }
get borderBlue_600() { return this.add("border-blue-600"); }
get borderBlue_700() { return this.add("border-blue-700"); }
get borderBlue_800() { return this.add("border-blue-800"); }
get borderBlue_900() { return this.add("border-blue-900"); }
get borderIndigo_100() { return this.add("border-indigo-100"); }
get borderIndigo_200() { return this.add("border-indigo-200"); }
get borderIndigo_300() { return this.add("border-indigo-300"); }
get borderIndigo_400() { return this.add("border-indigo-400"); }
get borderIndigo_500() { return this.add("border-indigo-500"); }
get borderIndigo_600() { return this.add("border-indigo-600"); }
get borderIndigo_700() { return this.add("border-indigo-700"); }
get borderIndigo_800() { return this.add("border-indigo-800"); }
get borderIndigo_900() { return this.add("border-indigo-900"); }
get borderPurple_100() { return this.add("border-purple-100"); }
get borderPurple_200() { return this.add("border-purple-200"); }
get borderPurple_300() { return this.add("border-purple-300"); }
get borderPurple_400() { return this.add("border-purple-400"); }
get borderPurple_500() { return this.add("border-purple-500"); }
get borderPurple_600() { return this.add("border-purple-600"); }
get borderPurple_700() { return this.add("border-purple-700"); }
get borderPurple_800() { return this.add("border-purple-800"); }
get borderPurple_900() { return this.add("border-purple-900"); }
get borderPink_100() { return this.add("border-pink-100"); }
get borderPink_200() { return this.add("border-pink-200"); }
get borderPink_300() { return this.add("border-pink-300"); }
get borderPink_400() { return this.add("border-pink-400"); }
get borderPink_500() { return this.add("border-pink-500"); }
get borderPink_600() { return this.add("border-pink-600"); }
get borderPink_700() { return this.add("border-pink-700"); }
get borderPink_800() { return this.add("border-pink-800"); }
get borderPink_900() { return this.add("border-pink-900"); }
get roundedNone() { return this.add("rounded-none"); }
get roundedSm() { return this.add("rounded-sm"); }
get rounded() { return this.add("rounded"); }
get roundedLg() { return this.add("rounded-lg"); }
get roundedFull() { return this.add("rounded-full"); }
get roundedTNone() { return this.add("rounded-t-none"); }
get roundedRNone() { return this.add("rounded-r-none"); }
get roundedBNone() { return this.add("rounded-b-none"); }
get roundedLNone() { return this.add("rounded-l-none"); }
get roundedTSm() { return this.add("rounded-t-sm"); }
get roundedRSm() { return this.add("rounded-r-sm"); }
get roundedBSm() { return this.add("rounded-b-sm"); }
get roundedLSm() { return this.add("rounded-l-sm"); }
get roundedT() { return this.add("rounded-t"); }
get roundedR() { return this.add("rounded-r"); }
get roundedB() { return this.add("rounded-b"); }
get roundedL() { return this.add("rounded-l"); }
get roundedTLg() { return this.add("rounded-t-lg"); }
get roundedRLg() { return this.add("rounded-r-lg"); }
get roundedBLg() { return this.add("rounded-b-lg"); }
get roundedLLg() { return this.add("rounded-l-lg"); }
get roundedTFull() { return this.add("rounded-t-full"); }
get roundedRFull() { return this.add("rounded-r-full"); }
get roundedBFull() { return this.add("rounded-b-full"); }
get roundedLFull() { return this.add("rounded-l-full"); }
get roundedTlNone() { return this.add("rounded-tl-none"); }
get roundedTrNone() { return this.add("rounded-tr-none"); }
get roundedBrNone() { return this.add("rounded-br-none"); }
get roundedBlNone() { return this.add("rounded-bl-none"); }
get roundedTlSm() { return this.add("rounded-tl-sm"); }
get roundedTrSm() { return this.add("rounded-tr-sm"); }
get roundedBrSm() { return this.add("rounded-br-sm"); }
get roundedBlSm() { return this.add("rounded-bl-sm"); }
get roundedTl() { return this.add("rounded-tl"); }
get roundedTr() { return this.add("rounded-tr"); }
get roundedBr() { return this.add("rounded-br"); }
get roundedBl() { return this.add("rounded-bl"); }
get roundedTlLg() { return this.add("rounded-tl-lg"); }
get roundedTrLg() { return this.add("rounded-tr-lg"); }
get roundedBrLg() { return this.add("rounded-br-lg"); }
get roundedBlLg() { return this.add("rounded-bl-lg"); }
get roundedTlFull() { return this.add("rounded-tl-full"); }
get roundedTrFull() { return this.add("rounded-tr-full"); }
get roundedBrFull() { return this.add("rounded-br-full"); }
get roundedBlFull() { return this.add("rounded-bl-full"); }
get borderSolid() { return this.add("border-solid"); }
get borderDashed() { return this.add("border-dashed"); }
get borderDotted() { return this.add("border-dotted"); }
get borderDouble() { return this.add("border-double"); }
get borderNone() { return this.add("border-none"); }
get border_0() { return this.add("border-0"); }
get border_2() { return this.add("border-2"); }
get border_4() { return this.add("border-4"); }
get border_8() { return this.add("border-8"); }
get border() { return this.add("border"); }
get borderT_0() { return this.add("border-t-0"); }
get borderR_0() { return this.add("border-r-0"); }
get borderB_0() { return this.add("border-b-0"); }
get borderL_0() { return this.add("border-l-0"); }
get borderT_2() { return this.add("border-t-2"); }
get borderR_2() { return this.add("border-r-2"); }
get borderB_2() { return this.add("border-b-2"); }
get borderL_2() { return this.add("border-l-2"); }
get borderT_4() { return this.add("border-t-4"); }
get borderR_4() { return this.add("border-r-4"); }
get borderB_4() { return this.add("border-b-4"); }
get borderL_4() { return this.add("border-l-4"); }
get borderT_8() { return this.add("border-t-8"); }
get borderR_8() { return this.add("border-r-8"); }
get borderB_8() { return this.add("border-b-8"); }
get borderL_8() { return this.add("border-l-8"); }
get borderT() { return this.add("border-t"); }
get borderR() { return this.add("border-r"); }
get borderB() { return this.add("border-b"); }
get borderL() { return this.add("border-l"); }
get cursorAuto() { return this.add("cursor-auto"); }
get cursorDefault() { return this.add("cursor-default"); }
get cursorPointer() { return this.add("cursor-pointer"); }
get cursorWait() { return this.add("cursor-wait"); }
get cursorText() { return this.add("cursor-text"); }
get cursorMove() { return this.add("cursor-move"); }
get cursorNotAllowed() { return this.add("cursor-not-allowed"); }
get block() { return this.add("block"); }
get inlineBlock() { return this.add("inline-block"); }
get inline() { return this.add("inline"); }
get flex() { return this.add("flex"); }
get inlineFlex() { return this.add("inline-flex"); }
get table() { return this.add("table"); }
get tableRow() { return this.add("table-row"); }
get tableCell() { return this.add("table-cell"); }
get hidden() { return this.add("hidden"); }
get flexRow() { return this.add("flex-row"); }
get flexRowReverse() { return this.add("flex-row-reverse"); }
get flexCol() { return this.add("flex-col"); }
get flexColReverse() { return this.add("flex-col-reverse"); }
get flexWrap() { return this.add("flex-wrap"); }
get flexWrapReverse() { return this.add("flex-wrap-reverse"); }
get flexNoWrap() { return this.add("flex-no-wrap"); }
get itemsStart() { return this.add("items-start"); }
get itemsEnd() { return this.add("items-end"); }
get itemsCenter() { return this.add("items-center"); }
get itemsBaseline() { return this.add("items-baseline"); }
get itemsStretch() { return this.add("items-stretch"); }
get selfAuto() { return this.add("self-auto"); }
get selfStart() { return this.add("self-start"); }
get selfEnd() { return this.add("self-end"); }
get selfCenter() { return this.add("self-center"); }
get selfStretch() { return this.add("self-stretch"); }
get justifyStart() { return this.add("justify-start"); }
get justifyEnd() { return this.add("justify-end"); }
get justifyCenter() { return this.add("justify-center"); }
get justifyBetween() { return this.add("justify-between"); }
get justifyAround() { return this.add("justify-around"); }
get contentCenter() { return this.add("content-center"); }
get contentStart() { return this.add("content-start"); }
get contentEnd() { return this.add("content-end"); }
get contentBetween() { return this.add("content-between"); }
get contentAround() { return this.add("content-around"); }
get flex_1() { return this.add("flex-1"); }
get flexAuto() { return this.add("flex-auto"); }
get flexInitial() { return this.add("flex-initial"); }
get flexNone() { return this.add("flex-none"); }
get flexGrow_0() { return this.add("flex-grow-0"); }
get flexGrow() { return this.add("flex-grow"); }
get flexShrink_0() { return this.add("flex-shrink-0"); }
get flexShrink() { return this.add("flex-shrink"); }
get order_1() { return this.add("order-1"); }
get order_2() { return this.add("order-2"); }
get order_3() { return this.add("order-3"); }
get order_4() { return this.add("order-4"); }
get order_5() { return this.add("order-5"); }
get order_6() { return this.add("order-6"); }
get order_7() { return this.add("order-7"); }
get order_8() { return this.add("order-8"); }
get order_9() { return this.add("order-9"); }
get order_10() { return this.add("order-10"); }
get order_11() { return this.add("order-11"); }
get order_12() { return this.add("order-12"); }
get orderFirst() { return this.add("order-first"); }
get orderLast() { return this.add("order-last"); }
get orderNone() { return this.add("order-none"); }
get floatRight() { return this.add("float-right"); }
get floatLeft() { return this.add("float-left"); }
get floatNone() { return this.add("float-none"); }
get fontSans() { return this.add("font-sans"); }
get fontSerif() { return this.add("font-serif"); }
get fontMono() { return this.add("font-mono"); }
get fontHairline() { return this.add("font-hairline"); }
get fontThin() { return this.add("font-thin"); }
get fontLight() { return this.add("font-light"); }
get fontNormal() { return this.add("font-normal"); }
get fontMedium() { return this.add("font-medium"); }
get fontSemibold() { return this.add("font-semibold"); }
get fontBold() { return this.add("font-bold"); }
get fontExtrabold() { return this.add("font-extrabold"); }
get fontBlack() { return this.add("font-black"); }
get h_0() { return this.add("h-0"); }
get h_1() { return this.add("h-1"); }
get h_2() { return this.add("h-2"); }
get h_3() { return this.add("h-3"); }
get h_4() { return this.add("h-4"); }
get h_5() { return this.add("h-5"); }
get h_6() { return this.add("h-6"); }
get h_8() { return this.add("h-8"); }
get h_10() { return this.add("h-10"); }
get h_12() { return this.add("h-12"); }
get h_16() { return this.add("h-16"); }
get h_20() { return this.add("h-20"); }
get h_24() { return this.add("h-24"); }
get h_32() { return this.add("h-32"); }
get h_40() { return this.add("h-40"); }
get h_48() { return this.add("h-48"); }
get h_56() { return this.add("h-56"); }
get h_64() { return this.add("h-64"); }
get hAuto() { return this.add("h-auto"); }
get hPx() { return this.add("h-px"); }
get hFull() { return this.add("h-full"); }
get hScreen() { return this.add("h-screen"); }
get leadingNone() { return this.add("leading-none"); }
get leadingTight() { return this.add("leading-tight"); }
get leadingSnug() { return this.add("leading-snug"); }
get leadingNormal() { return this.add("leading-normal"); }
get leadingRelaxed() { return this.add("leading-relaxed"); }
get leadingLoose() { return this.add("leading-loose"); }
get listInside() { return this.add("list-inside"); }
get listOutside() { return this.add("list-outside"); }
get listNone() { return this.add("list-none"); }
get listDisc() { return this.add("list-disc"); }
get listDecimal() { return this.add("list-decimal"); }
get m_0() { return this.add("m-0"); }
get m_1() { return this.add("m-1"); }
get m_2() { return this.add("m-2"); }
get m_3() { return this.add("m-3"); }
get m_4() { return this.add("m-4"); }
get m_5() { return this.add("m-5"); }
get m_6() { return this.add("m-6"); }
get m_8() { return this.add("m-8"); }
get m_10() { return this.add("m-10"); }
get m_12() { return this.add("m-12"); }
get m_16() { return this.add("m-16"); }
get m_20() { return this.add("m-20"); }
get m_24() { return this.add("m-24"); }
get m_32() { return this.add("m-32"); }
get m_40() { return this.add("m-40"); }
get m_48() { return this.add("m-48"); }
get m_56() { return this.add("m-56"); }
get m_64() { return this.add("m-64"); }
get mAuto() { return this.add("m-auto"); }
get mPx() { return this.add("m-px"); }
get my_0() { return this.add("my-0"); }
get mx_0() { return this.add("mx-0"); }
get my_1() { return this.add("my-1"); }
get mx_1() { return this.add("mx-1"); }
get my_2() { return this.add("my-2"); }
get mx_2() { return this.add("mx-2"); }
get my_3() { return this.add("my-3"); }
get mx_3() { return this.add("mx-3"); }
get my_4() { return this.add("my-4"); }
get mx_4() { return this.add("mx-4"); }
get my_5() { return this.add("my-5"); }
get mx_5() { return this.add("mx-5"); }
get my_6() { return this.add("my-6"); }
get mx_6() { return this.add("mx-6"); }
get my_8() { return this.add("my-8"); }
get mx_8() { return this.add("mx-8"); }
get my_10() { return this.add("my-10"); }
get mx_10() { return this.add("mx-10"); }
get my_12() { return this.add("my-12"); }
get mx_12() { return this.add("mx-12"); }
get my_16() { return this.add("my-16"); }
get mx_16() { return this.add("mx-16"); }
get my_20() { return this.add("my-20"); }
get mx_20() { return this.add("mx-20"); }
get my_24() { return this.add("my-24"); }
get mx_24() { return this.add("mx-24"); }
get my_32() { return this.add("my-32"); }
get mx_32() { return this.add("mx-32"); }
get my_40() { return this.add("my-40"); }
get mx_40() { return this.add("mx-40"); }
get my_48() { return this.add("my-48"); }
get mx_48() { return this.add("mx-48"); }
get my_56() { return this.add("my-56"); }
get mx_56() { return this.add("mx-56"); }
get my_64() { return this.add("my-64"); }
get mx_64() { return this.add("mx-64"); }
get myAuto() { return this.add("my-auto"); }
get mxAuto() { return this.add("mx-auto"); }
get myPx() { return this.add("my-px"); }
get mxPx() { return this.add("mx-px"); }
get mt_0() { return this.add("mt-0"); }
get mr_0() { return this.add("mr-0"); }
get mb_0() { return this.add("mb-0"); }
get ml_0() { return this.add("ml-0"); }
get mt_1() { return this.add("mt-1"); }
get mr_1() { return this.add("mr-1"); }
get mb_1() { return this.add("mb-1"); }
get ml_1() { return this.add("ml-1"); }
get mt_2() { return this.add("mt-2"); }
get mr_2() { return this.add("mr-2"); }
get mb_2() { return this.add("mb-2"); }
get ml_2() { return this.add("ml-2"); }
get mt_3() { return this.add("mt-3"); }
get mr_3() { return this.add("mr-3"); }
get mb_3() { return this.add("mb-3"); }
get ml_3() { return this.add("ml-3"); }
get mt_4() { return this.add("mt-4"); }
get mr_4() { return this.add("mr-4"); }
get mb_4() { return this.add("mb-4"); }
get ml_4() { return this.add("ml-4"); }
get mt_5() { return this.add("mt-5"); }
get mr_5() { return this.add("mr-5"); }
get mb_5() { return this.add("mb-5"); }
get ml_5() { return this.add("ml-5"); }
get mt_6() { return this.add("mt-6"); }
get mr_6() { return this.add("mr-6"); }
get mb_6() { return this.add("mb-6"); }
get ml_6() { return this.add("ml-6"); }
get mt_8() { return this.add("mt-8"); }
get mr_8() { return this.add("mr-8"); }
get mb_8() { return this.add("mb-8"); }
get ml_8() { return this.add("ml-8"); }
get mt_10() { return this.add("mt-10"); }
get mr_10() { return this.add("mr-10"); }
get mb_10() { return this.add("mb-10"); }
get ml_10() { return this.add("ml-10"); }
get mt_12() { return this.add("mt-12"); }
get mr_12() { return this.add("mr-12"); }
get mb_12() { return this.add("mb-12"); }
get ml_12() { return this.add("ml-12"); }
get mt_16() { return this.add("mt-16"); }
get mr_16() { return this.add("mr-16"); }
get mb_16() { return this.add("mb-16"); }
get ml_16() { return this.add("ml-16"); }
get mt_20() { return this.add("mt-20"); }
get mr_20() { return this.add("mr-20"); }
get mb_20() { return this.add("mb-20"); }
get ml_20() { return this.add("ml-20"); }
get mt_24() { return this.add("mt-24"); }
get mr_24() { return this.add("mr-24"); }
get mb_24() { return this.add("mb-24"); }
get ml_24() { return this.add("ml-24"); }
get mt_32() { return this.add("mt-32"); }
get mr_32() { return this.add("mr-32"); }
get mb_32() { return this.add("mb-32"); }
get ml_32() { return this.add("ml-32"); }
get mt_40() { return this.add("mt-40"); }
get mr_40() { return this.add("mr-40"); }
get mb_40() { return this.add("mb-40"); }
get ml_40() { return this.add("ml-40"); }
get mt_48() { return this.add("mt-48"); }
get mr_48() { return this.add("mr-48"); }
get mb_48() { return this.add("mb-48"); }
get ml_48() { return this.add("ml-48"); }
get mt_56() { return this.add("mt-56"); }
get mr_56() { return this.add("mr-56"); }
get mb_56() { return this.add("mb-56"); }
get ml_56() { return this.add("ml-56"); }
get mt_64() { return this.add("mt-64"); }
get mr_64() { return this.add("mr-64"); }
get mb_64() { return this.add("mb-64"); }
get ml_64() { return this.add("ml-64"); }
get mtAuto() { return this.add("mt-auto"); }
get mrAuto() { return this.add("mr-auto"); }
get mbAuto() { return this.add("mb-auto"); }
get mlAuto() { return this.add("ml-auto"); }
get mtPx() { return this.add("mt-px"); }
get mrPx() { return this.add("mr-px"); }
get mbPx() { return this.add("mb-px"); }
get mlPx() { return this.add("ml-px"); }
get maxHFull() { return this.add("max-h-full"); }
get maxHScreen() { return this.add("max-h-screen"); }
get maxWXs() { return this.add("max-w-xs"); }
get maxWSm() { return this.add("max-w-sm"); }
get maxWMd() { return this.add("max-w-md"); }
get maxWLg() { return this.add("max-w-lg"); }
get maxWXl() { return this.add("max-w-xl"); }
get maxW_2xl() { return this.add("max-w-2xl"); }
get maxW_3xl() { return this.add("max-w-3xl"); }
get maxW_4xl() { return this.add("max-w-4xl"); }
get maxW_5xl() { return this.add("max-w-5xl"); }
get maxW_6xl() { return this.add("max-w-6xl"); }
get maxWFull() { return this.add("max-w-full"); }
get minH_0() { return this.add("min-h-0"); }
get minHFull() { return this.add("min-h-full"); }
get minHScreen() { return this.add("min-h-screen"); }
get minW_0() { return this.add("min-w-0"); }
get minWFull() { return this.add("min-w-full"); }
get objectContain() { return this.add("object-contain"); }
get objectCover() { return this.add("object-cover"); }
get objectFill() { return this.add("object-fill"); }
get objectNone() { return this.add("object-none"); }
get objectScaleDown() { return this.add("object-scale-down"); }
get objectBottom() { return this.add("object-bottom"); }
get objectCenter() { return this.add("object-center"); }
get objectLeft() { return this.add("object-left"); }
get objectLeftBottom() { return this.add("object-left-bottom"); }
get objectLeftTop() { return this.add("object-left-top"); }
get objectRight() { return this.add("object-right"); }
get objectRightBottom() { return this.add("object-right-bottom"); }
get objectRightTop() { return this.add("object-right-top"); }
get objectTop() { return this.add("object-top"); }
get opacity_0() { return this.add("opacity-0"); }
get opacity_25() { return this.add("opacity-25"); }
get opacity_50() { return this.add("opacity-50"); }
get opacity_75() { return this.add("opacity-75"); }
get opacity_100() { return this.add("opacity-100"); }
get outlineNone() { return this.add("outline-none"); }
get overflowAuto() { return this.add("overflow-auto"); }
get overflowHidden() { return this.add("overflow-hidden"); }
get overflowVisible() { return this.add("overflow-visible"); }
get overflowScroll() { return this.add("overflow-scroll"); }
get overflowXAuto() { return this.add("overflow-x-auto"); }
get overflowYAuto() { return this.add("overflow-y-auto"); }
get overflowXHidden() { return this.add("overflow-x-hidden"); }
get overflowYHidden() { return this.add("overflow-y-hidden"); }
get overflowXVisible() { return this.add("overflow-x-visible"); }
get overflowYVisible() { return this.add("overflow-y-visible"); }
get overflowXScroll() { return this.add("overflow-x-scroll"); }
get overflowYScroll() { return this.add("overflow-y-scroll"); }
get scrollingTouch() { return this.add("scrolling-touch"); }
get scrollingAuto() { return this.add("scrolling-auto"); }
get p_0() { return this.add("p-0"); }
get p_1() { return this.add("p-1"); }
get p_2() { return this.add("p-2"); }
get p_3() { return this.add("p-3"); }
get p_4() { return this.add("p-4"); }
get p_5() { return this.add("p-5"); }
get p_6() { return this.add("p-6"); }
get p_8() { return this.add("p-8"); }
get p_10() { return this.add("p-10"); }
get p_12() { return this.add("p-12"); }
get p_16() { return this.add("p-16"); }
get p_20() { return this.add("p-20"); }
get p_24() { return this.add("p-24"); }
get p_32() { return this.add("p-32"); }
get p_40() { return this.add("p-40"); }
get p_48() { return this.add("p-48"); }
get p_56() { return this.add("p-56"); }
get p_64() { return this.add("p-64"); }
get pPx() { return this.add("p-px"); }
get py_0() { return this.add("py-0"); }
get px_0() { return this.add("px-0"); }
get py_1() { return this.add("py-1"); }
get px_1() { return this.add("px-1"); }
get py_2() { return this.add("py-2"); }
get px_2() { return this.add("px-2"); }
get py_3() { return this.add("py-3"); }
get px_3() { return this.add("px-3"); }
get py_4() { return this.add("py-4"); }
get px_4() { return this.add("px-4"); }
get py_5() { return this.add("py-5"); }
get px_5() { return this.add("px-5"); }
get py_6() { return this.add("py-6"); }
get px_6() { return this.add("px-6"); }
get py_8() { return this.add("py-8"); }
get px_8() { return this.add("px-8"); }
get py_10() { return this.add("py-10"); }
get px_10() { return this.add("px-10"); }
get py_12() { return this.add("py-12"); }
get px_12() { return this.add("px-12"); }
get py_16() { return this.add("py-16"); }
get px_16() { return this.add("px-16"); }
get py_20() { return this.add("py-20"); }
get px_20() { return this.add("px-20"); }
get py_24() { return this.add("py-24"); }
get px_24() { return this.add("px-24"); }
get py_32() { return this.add("py-32"); }
get px_32() { return this.add("px-32"); }
get py_40() { return this.add("py-40"); }
get px_40() { return this.add("px-40"); }
get py_48() { return this.add("py-48"); }
get px_48() { return this.add("px-48"); }
get py_56() { return this.add("py-56"); }
get px_56() { return this.add("px-56"); }
get py_64() { return this.add("py-64"); }
get px_64() { return this.add("px-64"); }
get pyPx() { return this.add("py-px"); }
get pxPx() { return this.add("px-px"); }
get pt_0() { return this.add("pt-0"); }
get pr_0() { return this.add("pr-0"); }
get pb_0() { return this.add("pb-0"); }
get pl_0() { return this.add("pl-0"); }
get pt_1() { return this.add("pt-1"); }
get pr_1() { return this.add("pr-1"); }
get pb_1() { return this.add("pb-1"); }
get pl_1() { return this.add("pl-1"); }
get pt_2() { return this.add("pt-2"); }
get pr_2() { return this.add("pr-2"); }
get pb_2() { return this.add("pb-2"); }
get pl_2() { return this.add("pl-2"); }
get pt_3() { return this.add("pt-3"); }
get pr_3() { return this.add("pr-3"); }
get pb_3() { return this.add("pb-3"); }
get pl_3() { return this.add("pl-3"); }
get pt_4() { return this.add("pt-4"); }
get pr_4() { return this.add("pr-4"); }
get pb_4() { return this.add("pb-4"); }
get pl_4() { return this.add("pl-4"); }
get pt_5() { return this.add("pt-5"); }
get pr_5() { return this.add("pr-5"); }
get pb_5() { return this.add("pb-5"); }
get pl_5() { return this.add("pl-5"); }
get pt_6() { return this.add("pt-6"); }
get pr_6() { return this.add("pr-6"); }
get pb_6() { return this.add("pb-6"); }
get pl_6() { return this.add("pl-6"); }
get pt_8() { return this.add("pt-8"); }
get pr_8() { return this.add("pr-8"); }
get pb_8() { return this.add("pb-8"); }
get pl_8() { return this.add("pl-8"); }
get pt_10() { return this.add("pt-10"); }
get pr_10() { return this.add("pr-10"); }
get pb_10() { return this.add("pb-10"); }
get pl_10() { return this.add("pl-10"); }
get pt_12() { return this.add("pt-12"); }
get pr_12() { return this.add("pr-12"); }
get pb_12() { return this.add("pb-12"); }
get pl_12() { return this.add("pl-12"); }
get pt_16() { return this.add("pt-16"); }
get pr_16() { return this.add("pr-16"); }
get pb_16() { return this.add("pb-16"); }
get pl_16() { return this.add("pl-16"); }
get pt_20() { return this.add("pt-20"); }
get pr_20() { return this.add("pr-20"); }
get pb_20() { return this.add("pb-20"); }
get pl_20() { return this.add("pl-20"); }
get pt_24() { return this.add("pt-24"); }
get pr_24() { return this.add("pr-24"); }
get pb_24() { return this.add("pb-24"); }
get pl_24() { return this.add("pl-24"); }
get pt_32() { return this.add("pt-32"); }
get pr_32() { return this.add("pr-32"); }
get pb_32() { return this.add("pb-32"); }
get pl_32() { return this.add("pl-32"); }
get pt_40() { return this.add("pt-40"); }
get pr_40() { return this.add("pr-40"); }
get pb_40() { return this.add("pb-40"); }
get pl_40() { return this.add("pl-40"); }
get pt_48() { return this.add("pt-48"); }
get pr_48() { return this.add("pr-48"); }
get pb_48() { return this.add("pb-48"); }
get pl_48() { return this.add("pl-48"); }
get pt_56() { return this.add("pt-56"); }
get pr_56() { return this.add("pr-56"); }
get pb_56() { return this.add("pb-56"); }
get pl_56() { return this.add("pl-56"); }
get pt_64() { return this.add("pt-64"); }
get pr_64() { return this.add("pr-64"); }
get pb_64() { return this.add("pb-64"); }
get pl_64() { return this.add("pl-64"); }
get ptPx() { return this.add("pt-px"); }
get prPx() { return this.add("pr-px"); }
get pbPx() { return this.add("pb-px"); }
get plPx() { return this.add("pl-px"); }
get pointerEventsNone() { return this.add("pointer-events-none"); }
get pointerEventsAuto() { return this.add("pointer-events-auto"); }
get static() { return this.add("static"); }
get Fixed() { return this.add("fixed"); }
get absolute() { return this.add("absolute"); }
get relative() { return this.add("relative"); }
get sticky() { return this.add("sticky"); }
get inset_0() { return this.add("inset-0"); }
get insetAuto() { return this.add("inset-auto"); }
get insetY_0() { return this.add("inset-y-0"); }
get insetX_0() { return this.add("inset-x-0"); }
get insetYAuto() { return this.add("inset-y-auto"); }
get insetXAuto() { return this.add("inset-x-auto"); }
get top_0() { return this.add("top-0"); }
get right_0() { return this.add("right-0"); }
get bottom_0() { return this.add("bottom-0"); }
get left_0() { return this.add("left-0"); }
get topAuto() { return this.add("top-auto"); }
get rightAuto() { return this.add("right-auto"); }
get bottomAuto() { return this.add("bottom-auto"); }
get leftAuto() { return this.add("left-auto"); }
get resizeNone() { return this.add("resize-none"); }
get resizeY() { return this.add("resize-y"); }
get resizeX() { return this.add("resize-x"); }
get resize() { return this.add("resize"); }
get shadow() { return this.add("shadow"); }
get shadowMd() { return this.add("shadow-md"); }
get shadowLg() { return this.add("shadow-lg"); }
get shadowXl() { return this.add("shadow-xl"); }
get shadow_2xl() { return this.add("shadow-2xl"); }
get shadowInner() { return this.add("shadow-inner"); }
get shadowOutline() { return this.add("shadow-outline"); }
get shadowNone() { return this.add("shadow-none"); }
get fillCurrent() { return this.add("fill-current"); }
get strokeCurrent() { return this.add("stroke-current"); }
get tableAuto() { return this.add("table-auto"); }
get tableFixed() { return this.add("table-fixed"); }
get textLeft() { return this.add("text-left"); }
get textCenter() { return this.add("text-center"); }
get textRight() { return this.add("text-right"); }
get textJustify() { return this.add("text-justify"); }
get textTransparent() { return this.add("text-transparent"); }
get textBlack() { return this.add("text-black"); }
get textWhite() { return this.add("text-white"); }
get textGray_100() { return this.add("text-gray-100"); }
get textGray_200() { return this.add("text-gray-200"); }
get textGray_300() { return this.add("text-gray-300"); }
get textGray_400() { return this.add("text-gray-400"); }
get textGray_500() { return this.add("text-gray-500"); }
get textGray_600() { return this.add("text-gray-600"); }
get textGray_700() { return this.add("text-gray-700"); }
get textGray_800() { return this.add("text-gray-800"); }
get textGray_900() { return this.add("text-gray-900"); }
get textRed_100() { return this.add("text-red-100"); }
get textRed_200() { return this.add("text-red-200"); }
get textRed_300() { return this.add("text-red-300"); }
get textRed_400() { return this.add("text-red-400"); }
get textRed_500() { return this.add("text-red-500"); }
get textRed_600() { return this.add("text-red-600"); }
get textRed_700() { return this.add("text-red-700"); }
get textRed_800() { return this.add("text-red-800"); }
get textRed_900() { return this.add("text-red-900"); }
get textOrange_100() { return this.add("text-orange-100"); }
get textOrange_200() { return this.add("text-orange-200"); }
get textOrange_300() { return this.add("text-orange-300"); }
get textOrange_400() { return this.add("text-orange-400"); }
get textOrange_500() { return this.add("text-orange-500"); }
get textOrange_600() { return this.add("text-orange-600"); }
get textOrange_700() { return this.add("text-orange-700"); }
get textOrange_800() { return this.add("text-orange-800"); }
get textOrange_900() { return this.add("text-orange-900"); }
get textYellow_100() { return this.add("text-yellow-100"); }
get textYellow_200() { return this.add("text-yellow-200"); }
get textYellow_300() { return this.add("text-yellow-300"); }
get textYellow_400() { return this.add("text-yellow-400"); }
get textYellow_500() { return this.add("text-yellow-500"); }
get textYellow_600() { return this.add("text-yellow-600"); }
get textYellow_700() { return this.add("text-yellow-700"); }
get textYellow_800() { return this.add("text-yellow-800"); }
get textYellow_900() { return this.add("text-yellow-900"); }
get textGreen_100() { return this.add("text-green-100"); }
get textGreen_200() { return this.add("text-green-200"); }
get textGreen_300() { return this.add("text-green-300"); }
get textGreen_400() { return this.add("text-green-400"); }
get textGreen_500() { return this.add("text-green-500"); }
get textGreen_600() { return this.add("text-green-600"); }
get textGreen_700() { return this.add("text-green-700"); }
get textGreen_800() { return this.add("text-green-800"); }
get textGreen_900() { return this.add("text-green-900"); }
get textTeal_100() { return this.add("text-teal-100"); }
get textTeal_200() { return this.add("text-teal-200"); }
get textTeal_300() { return this.add("text-teal-300"); }
get textTeal_400() { return this.add("text-teal-400"); }
get textTeal_500() { return this.add("text-teal-500"); }
get textTeal_600() { return this.add("text-teal-600"); }
get textTeal_700() { return this.add("text-teal-700"); }
get textTeal_800() { return this.add("text-teal-800"); }
get textTeal_900() { return this.add("text-teal-900"); }
get textBlue_100() { return this.add("text-blue-100"); }
get textBlue_200() { return this.add("text-blue-200"); }
get textBlue_300() { return this.add("text-blue-300"); }
get textBlue_400() { return this.add("text-blue-400"); }
get textBlue_500() { return this.add("text-blue-500"); }
get textBlue_600() { return this.add("text-blue-600"); }
get textBlue_700() { return this.add("text-blue-700"); }
get textBlue_800() { return this.add("text-blue-800"); }
get textBlue_900() { return this.add("text-blue-900"); }
get textIndigo_100() { return this.add("text-indigo-100"); }
get textIndigo_200() { return this.add("text-indigo-200"); }
get textIndigo_300() { return this.add("text-indigo-300"); }
get textIndigo_400() { return this.add("text-indigo-400"); }
get textIndigo_500() { return this.add("text-indigo-500"); }
get textIndigo_600() { return this.add("text-indigo-600"); }
get textIndigo_700() { return this.add("text-indigo-700"); }
get textIndigo_800() { return this.add("text-indigo-800"); }
get textIndigo_900() { return this.add("text-indigo-900"); }
get textPurple_100() { return this.add("text-purple-100"); }
get textPurple_200() { return this.add("text-purple-200"); }
get textPurple_300() { return this.add("text-purple-300"); }
get textPurple_400() { return this.add("text-purple-400"); }
get textPurple_500() { return this.add("text-purple-500"); }
get textPurple_600() { return this.add("text-purple-600"); }
get textPurple_700() { return this.add("text-purple-700"); }
get textPurple_800() { return this.add("text-purple-800"); }
get textPurple_900() { return this.add("text-purple-900"); }
get textPink_100() { return this.add("text-pink-100"); }
get textPink_200() { return this.add("text-pink-200"); }
get textPink_300() { return this.add("text-pink-300"); }
get textPink_400() { return this.add("text-pink-400"); }
get textPink_500() { return this.add("text-pink-500"); }
get textPink_600() { return this.add("text-pink-600"); }
get textPink_700() { return this.add("text-pink-700"); }
get textPink_800() { return this.add("text-pink-800"); }
get textPink_900() { return this.add("text-pink-900"); }
get textXs() { return this.add("text-xs"); }
get textSm() { return this.add("text-sm"); }
get textBase() { return this.add("text-base"); }
get textLg() { return this.add("text-lg"); }
get textXl() { return this.add("text-xl"); }
get text_2xl() { return this.add("text-2xl"); }
get text_3xl() { return this.add("text-3xl"); }
get text_4xl() { return this.add("text-4xl"); }
get text_5xl() { return this.add("text-5xl"); }
get text_6xl() { return this.add("text-6xl"); }
get italic() { return this.add("italic"); }
get notItalic() { return this.add("not-italic"); }
get uppercase() { return this.add("uppercase"); }
get lowercase() { return this.add("lowercase"); }
get capitalize() { return this.add("capitalize"); }
get normalCase() { return this.add("normal-case"); }
get underline() { return this.add("underline"); }
get lineThrough() { return this.add("line-through"); }
get noUnderline() { return this.add("no-underline"); }
get antialiased() { return this.add("antialiased"); }
get subpixelAntialiased() { return this.add("subpixel-antialiased"); }
get trackingTighter() { return this.add("tracking-tighter"); }
get trackingTight() { return this.add("tracking-tight"); }
get trackingNormal() { return this.add("tracking-normal"); }
get trackingWide() { return this.add("tracking-wide"); }
get trackingWider() { return this.add("tracking-wider"); }
get trackingWidest() { return this.add("tracking-widest"); }
get selectNone() { return this.add("select-none"); }
get selectText() { return this.add("select-text"); }
get selectAll() { return this.add("select-all"); }
get selectAuto() { return this.add("select-auto"); }
get alignBaseline() { return this.add("align-baseline"); }
get alignTop() { return this.add("align-top"); }
get alignMiddle() { return this.add("align-middle"); }
get alignBottom() { return this.add("align-bottom"); }
get alignTextTop() { return this.add("align-text-top"); }
get alignTextBottom() { return this.add("align-text-bottom"); }
get visible() { return this.add("visible"); }
get invisible() { return this.add("invisible"); }
get whitespaceNormal() { return this.add("whitespace-normal"); }
get whitespaceNoWrap() { return this.add("whitespace-no-wrap"); }
get whitespacePre() { return this.add("whitespace-pre"); }
get whitespacePreLine() { return this.add("whitespace-pre-line"); }
get whitespacePreWrap() { return this.add("whitespace-pre-wrap"); }
get breakNormal() { return this.add("break-normal"); }
get breakWords() { return this.add("break-words"); }
get breakAll() { return this.add("break-all"); }
get truncate() { return this.add("truncate"); }
get w_0() { return this.add("w-0"); }
get w_1() { return this.add("w-1"); }
get w_2() { return this.add("w-2"); }
get w_3() { return this.add("w-3"); }
get w_4() { return this.add("w-4"); }
get w_5() { return this.add("w-5"); }
get w_6() { return this.add("w-6"); }
get w_8() { return this.add("w-8"); }
get w_10() { return this.add("w-10"); }
get w_12() { return this.add("w-12"); }
get w_16() { return this.add("w-16"); }
get w_20() { return this.add("w-20"); }
get w_24() { return this.add("w-24"); }
get w_32() { return this.add("w-32"); }
get w_40() { return this.add("w-40"); }
get w_48() { return this.add("w-48"); }
get w_56() { return this.add("w-56"); }
get w_64() { return this.add("w-64"); }
get wAuto() { return this.add("w-auto"); }
get wPx() { return this.add("w-px"); }
get w_1_2() { return this.add("w-1\/2"); }
get w_1_3() { return this.add("w-1\/3"); }
get w_2_3() { return this.add("w-2\/3"); }
get w_1_4() { return this.add("w-1\/4"); }
get w_2_4() { return this.add("w-2\/4"); }
get w_3_4() { return this.add("w-3\/4"); }
get w_1_5() { return this.add("w-1\/5"); }
get w_2_5() { return this.add("w-2\/5"); }
get w_3_5() { return this.add("w-3\/5"); }
get w_4_5() { return this.add("w-4\/5"); }
get w_1_6() { return this.add("w-1\/6"); }
get w_2_6() { return this.add("w-2\/6"); }
get w_3_6() { return this.add("w-3\/6"); }
get w_4_6() { return this.add("w-4\/6"); }
get w_5_6() { return this.add("w-5\/6"); }
get w_1_12() { return this.add("w-1\/12"); }
get w_2_12() { return this.add("w-2\/12"); }
get w_3_12() { return this.add("w-3\/12"); }
get w_4_12() { return this.add("w-4\/12"); }
get w_5_12() { return this.add("w-5\/12"); }
get w_6_12() { return this.add("w-6\/12"); }
get w_7_12() { return this.add("w-7\/12"); }
get w_8_12() { return this.add("w-8\/12"); }
get w_9_12() { return this.add("w-9\/12"); }
get w_10_12() { return this.add("w-10\/12"); }
get w_11_12() { return this.add("w-11\/12"); }
get wFull() { return this.add("w-full"); }
get wScreen() { return this.add("w-screen"); }
get z_0() { return this.add("z-0"); }
get z_10() { return this.add("z-10"); }
get z_20() { return this.add("z-20"); }
get z_30() { return this.add("z-30"); }
get z_40() { return this.add("z-40"); }
get z_50() { return this.add("z-50"); }
get zAuto() { return this.add("z-auto"); }

}

export const $$ = (selector?: string): BaseStyles =>  {
    return new BaseStyles("" + selector || "");
};

export const $ = $$();

