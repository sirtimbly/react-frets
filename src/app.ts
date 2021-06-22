import React, { PropsWithChildren, useState, ReactElement } from 'react'
import { map, random, uniqueId, head, tail } from 'lodash/fp'
import { $, $$, e, $onClick, $formOnSubmit } from './output-styles'
import { $Btn, $Button, $LinkBtn } from './components/buttons'
import { TextInput } from './components/input'

import { $Panel } from './components/panel'
import { FlowCol } from './components/layout'
import { FlowRowPack, FlowRowSpread, FlowWrap, Row } from './components/layout'
interface AppProps extends PropsWithChildren<any> {
  fancyName: string
  isVisible: boolean
}

const listItem = $$().div.mr_2.mb_2.bgYellow_500.textGray_900.p_2.text_2xl
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
    $.header.textCenter.textLg.h(props.fancyName),
    $Panel.light.maxWMd.selfCenter.w_1_2
      .hide(showList)
      .h(
        $formOnSubmit(() =>
          setShowList(true)
        ).flex.flexCol.itemsStretch.textBlue_500.h(
          TextInput(registerField('Username')),
          TextInput(registerField('Password')),
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
              $.span.textLg.fontBold.h('Items'),
              Row(
                $onClick(() => setFakeList([]))($LinkBtn.secondary, 'Clear'),
                $onClick(() =>
                  setFakeList([...fakeList, random(100)(1000).toString()])
                )($LinkBtn.primary, 'Add')
              )
            ),
            $.div.mt_4.h(FlowWrap(toListItem)(...fakeList))
          )
      )
  )
}

export const AppComponent = (props: AppProps) => e(app, props)
