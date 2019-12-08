import React, { PropsWithChildren, useState } from "react";
import { map } from "lodash/fp";
import { $ } from "~output-styles";
import { LinkButton } from "./components/buttons";
import { TextInput } from "./components/input";
interface IProps extends PropsWithChildren<any> {
  fancyName: string;
  isVisible: boolean;
}

const listItem = $.li.mb_1.bgRed_100.p_1;

export const AppComponent: React.FunctionComponent<IProps> = (
  props: IProps
) => {
  const [showList, setShowList] = useState(false);
  const [label, setLabel] = useState("");

  const fakeList = ["alpha", "beta", "gamma", "delta"];
  return $.div.flex.flexCol.h(
    TextInput({
      key: "label",
      value: label,
      handler: setLabel
    }),
    LinkButton.h(
      {
        key: "linkbutton",
        href: "#",
        onClick: () => {
          setShowList(!showList);
        }
      },
      "click me, I am inside a functional component"
    ),
    showList
      ? $.div.p_3.bgGray_200.borderGray_600.mt_3.h(
          { key: "mylist" },
          $.ul.h(
            ...map((val: string) => listItem.h({ key: val }, val))(fakeList)
          )
        )
      : "no list"
  );
};
