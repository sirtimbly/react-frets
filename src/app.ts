import React, { PropsWithChildren, useState } from 'react'
import { random, uniqueId } from 'lodash/fp'
import { $, $$, e, $onClick, $formOnSubmit } from './tailwind-styles'
import { $Btn } from './components/buttons'
import { TextInput } from './components/input'

import { $Panel } from './components/panel'
import { FlowWrap, Row } from './components/layout'
type AppProps = PropsWithChildren<{ fancyName: string; isVisible: boolean }>

const listItem = $$().div.mr_2.mb_2.bgPink_500.textWhite.p_2.text_2xl
const toListItem = (val: string) => listItem.h({ key: uniqueId(val) }, val)

export const app: React.FunctionComponent<AppProps> = (props) => {
  const [showList, setShowList] = useState(false)
  const [fakeList, setFakeList] = useState(['alpha', 'beta', 'gamma', 'delta'])
  const fields = {}
  const registerField = (name: string, initialValue = '', required = false) => {
    fields[name] = useState(initialValue)
    return {
      key: name,
      value: fields[name][0],
      required,
      handler: fields[name][1],
      validationErrors: [],
    }
  }

  return $.div.flex.flexCol.h(
    props.isVisible
      ? $.header.textCenter.textBlue_700.text_2xl.h(props.fancyName)
      : '',
    $Panel.light.maxWMd.shadowLg.selfCenter
      .hide(showList)
      .h(
        $formOnSubmit(() =>
          setShowList(true)
        ).flex.flexCol.itemsStretch.textGray_500.h(
          TextInput(registerField('Username', '', true)),
          TextInput(registerField('Password', '', true)),
          $Btn.primary.mt_2.h('Log In')
        )
      ),
    $.div.selfCenter.wFull
      .show(showList)
      .h(
        $Panel.light.wFull
          .show(showList)
          .h(
            Row(
              $.span.textLg.fontBold.h('List of Random Stuff'),
              Row(
                $onClick(() => setFakeList([]))($Btn.secondary, 'Clear'),
                $onClick(() =>
                  setFakeList([...fakeList, random(100)(1000).toString()])
                )($Btn.primary, 'Add')
              )
            ),
            $.div.mt_4.h(FlowWrap(toListItem)(...fakeList))
          ),
        $onClick(() => setShowList(false))($Btn.tertiary, 'Logout')
      )
  )
}

export const AppComponent = (
  props: AppProps
): React.FunctionComponentElement<AppProps> => e(app, props)
