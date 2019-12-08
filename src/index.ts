import ReactDOM from "react-dom";
import React, { useState } from "react";
import { $, e } from "~output-styles";
import { AppComponent } from "./app";

ReactDOM.render(
  $.div.container.mxAuto.bgWhite.shadow.h(
    $.div.p_3.bgBlue_200.textBlue_600.fontExtrabold.textRight.text_4xl.h(
      {
        key: "ghelokey"
      },
      "hello world"
    ),
    $.div.mt_2.p_3.h(
      {
        key: "fasdfsd"
      },
      e(AppComponent, {
        fancyName: "oohlahah",
        isVisible: true
      })
    )
  ),
  document.getElementById("app")
);
