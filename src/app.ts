import React, { PropsWithChildren, useState } from "react";
import { map } from "lodash/fp";
import { $ } from "~output-styles";
import { LinkButton } from "./components/buttons";
import { TextInput } from "./components/input";
interface IProps extends PropsWithChildren<any> {
  fancyName: string;
  isVisible: boolean;
}

const listItem = $.li.mb_1.bgBlue_100.textGray_900.p_1;

export const AppComponent: React.FunctionComponent<IProps> = (
  props: IProps
) => {
  const [showList, setShowList] = useState(false);
  const fields = {};
  const registerField = (
    name: string,
    initialValue: string = "",
    required: boolean = false
  ) => {
    fields[name] = useState(initialValue);
    return {
      key: name,
      value: fields[name][0],
      required,
      handler: fields[name][1],
      validationErrors: [],
    };
  };

  const fakeList = ["alpha", "beta", "gamma", "delta"];
  return $.div.flex.flexCol.itemsCenter.h(
    $.div.m_3.maxWMd.p_3.border.hide(showList).h(
      TextInput(registerField("Username")),
      TextInput(registerField("Password")),
      LinkButton.primary.mt_4.h(
        {
          key: "linkbutton",
          href: "#",
          onClick: () => {
            setShowList(!showList);
          },
        },
        "Log In"
      )
    ),
    $.div.p_3.bgGray_300.borderGray_600.mt_3
      .show(showList)
      .h(
        { key: "mylist" },
        $.ul.h(...map((val: string) => listItem.h({ key: val }, val))(fakeList))
      ),
    LinkButton.secondary.mt_2.show(showList).h(
      {
        onClick: () => {
          setShowList(!showList);
        },
      },
      "Close"
    )
  );
};
