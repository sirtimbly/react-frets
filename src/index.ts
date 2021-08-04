import ReactDOM from 'react-dom'
// import React, { useState, ReactElement } from 'react'
import { $ } from './tailwind-styles'
import { AppComponent } from './app'
import { md } from './helpers/md'

import { FlowRowPack } from './components/layout'
import { $Panel } from './components/panel'

ReactDOM.render(
  $.div.mxAuto.bgWhite.hFull.wFull.h(
    $.div.p_3.bgBlack.textWhite.shadowLg.fontExtrabold.text_2xl.h(
      'Frets with React'
    ),
    FlowRowPack((x) => $Panel.white.mr_1.w_1_3.content.h(x))(
      md`
# About This

Using _Frets_ hyperscript functions instead of JSX for imperative and clean UI rendering code.
[Visit the repo](https://github.com/sirtimbly/react-frets).

Open <code>src/index.ts</code> to see how to change the application layout. Styles are mostly utility classes provided by [tailwind](https://tailwindcss.com). Production code uses purge-css to minimize file size.
      `,
      $.div.p_1.h(
        AppComponent({
          fancyName: 'A Simple Demo App',
          isVisible: true,
        })
      )
    )
  ),
  document.getElementById('app')
)
