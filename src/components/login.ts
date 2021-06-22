import { IMountable, PropsWithFields, setup } from 'frets'
import { $, $$ } from '../styles/app-styles'
import { RealWorldProps } from '../app'
import { textInput } from './input'
import { error } from './error'

export class LoginProps extends PropsWithFields {
  accountId = ''

  loading: boolean

  logout: boolean

  error: string

  list: any

  showPlaceholder: boolean
}

const init = new LoginProps()
const loginApp = setup(init, (f) => {
  f.registerAcceptor((proposal: Partial<LoginProps>, state) => {
    if (proposal.accountId !== f.modelProps.accountId) {
      f.modelProps.error = ''
      f.modelProps.loading = true
      setTimeout(() => {
        f.modelProps.loading = false
        if (proposal.accountId === 'tim') {
          f.modelProps.accountId = proposal.accountId
        } else {
          f.modelProps.error = 'Invalid username or bad password.'
        }

        state(f.modelProps)
      }, 300)
    }
  })
  f.registerAcceptor((proposal: Partial<LoginProps>, state) => {
    f.modelProps.loading = proposal.loading || false
    state(f.modelProps)
  })
  f.registerAcceptor((proposal: Partial<LoginProps>, state) => {
    f.modelProps.showPlaceholder = proposal.showPlaceholder || false
    state(f.modelProps)
  })

  const usernameField = f.registerField('Username', f.modelProps.accountId, {
    notEmpty: {
      value: true,
      message: 'Username cannot be empty',
    },
  })
  const passField = f.registerField('Password', '', {
    notEmpty: {
      value: true,
      message: 'Password cannot be empty',
    },
    minLength: {
      value: 8,
      message: 'Password must be at least 8 characters',
    },
  })
  const loginAction = f.registerAction('login', (evt, present) => {
    evt.preventDefault()
    usernameField.validate()
    passField.validate()
    if (!usernameField.isValid() || !passField.isValid()) {
      return
    }

    present({
      accountId: usernameField.value,
    })
    passField.clear()
  })

  f.registerAcceptor((proposal: Partial<LoginProps>, state) => {
    if (proposal.logout === true) {
      f.modelProps.accountId = ''
    } else {
      proposal.logout = false
    }

    global({ loggedIn: true })
    state(f.modelProps)
  })

  const logoutAction = f.registerAction('logout', (evt, present) => {
    evt.preventDefault()
    present({
      logout: true,
    })
  })

  f.registerView(() => {
    console.log('re-rendering login view')
    return $.div.maxWMd.mxAuto.flex.flexCol.itemsCenter.p_6.bgWhite.rounded.shadowXl.my_3.h(
      [
        error(f.modelProps.error),
        f.modelProps.accountId
          ? $.div.minWFull.p_2.h([
              $.div.h([`Hello ${f.modelProps.accountId}`]),
              $.button.btn.btnBlue.mx_2.h({ onclick: logoutAction }, [
                'Logout',
              ]),
            ])
          : f.modelProps.loading
          ? $.div.textGray_700.textCenter.h(['Logging In...'])
          : $$('form').itemsCenter.flex.flexCol.minWFull.itemsStretch.h([
              ...[usernameField, passField].map(textInput),
              $.button.mt_2.btn.btnBlue.h(
                {
                  onclick: loginAction,
                  disabled: !(usernameField.isValid() && passField.isValid()),
                },
                ['Login']
              ),
            ]),
      ]
    )
  })
})

export default function loginComponent(
  global: (proposal: Partial<RealWorldProps>) => void
): IMountable<LoginProps> {
  return
}
