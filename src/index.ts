import ReactDOM from "react-dom";
import React, { useState, ReactElement } from "react";
import { $, e } from "~output-styles";
import { AppComponent } from "./app";
import { md } from "./helpers/md";

ReactDOM.render(
  $.div.container.mxAuto.bgWhite.shadow.h(
    $.div.p_3.bgBlack.textWhite.fontExtrabold.textCenter.text_4xl.h(
      "Frets with React"
    ),
    $.div.flexRow.justifyAround.p_4.h(md`
Using _Frets_ hyperscript functions instead of JSX for imperative and clean UI rendering code.
[Visit the repo](https://github.com/sirtimbly/react-frets).
    `),
    $.div.mt_2.p_3.h(
      e(AppComponent, {
        fancyName: "oohlahah",
        isVisible: true,
      })
    )
  ),
  document.getElementById("app")
);
