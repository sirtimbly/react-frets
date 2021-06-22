import ReactDOM from 'react-dom'
// import React, { useState, ReactElement } from 'react'
import { $, e } from './output-styles'
import { AppComponent } from './app'
import { md } from './helpers/md'
import './output.css'
import { FlowRowPack } from './components/layout'
import { $Panel } from './components/panel'

ReactDOM.render(
  $.div.mxAuto.bgWhite.hFull.wFull.h(
    $.div.p_3.bgBlack.textWhite.fontExtrabold.text_2xl.h('Frets with React'),
    FlowRowPack((x) => $Panel.white.mr_1.w_1_3.h(x))(
      md`
Using _Frets_ hyperscript functions instead of JSX for imperative and clean UI rendering code.
[Visit the repo](https://github.com/sirtimbly/react-frets).
      `,
      $.div.p_1.h(
        AppComponent({
          fancyName: 'Log This Stuff In Yo',
          isVisible: true,
        })
      )
    )
  ),
  document.getElementById('app')
)
