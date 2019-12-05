// Utility tool that will allows us to use navigation outside of react such as in case of using it in Context
import { NavigationActions } from 'react-navigation'

let navigator

export const setNavigator = (nav) => {
  navigator = nav
}

export const navigate = (routeName, params) => {
  navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params
    })
  )
}

