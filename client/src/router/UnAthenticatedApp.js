// Navigators
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

// Screens
import LoginScreen from '@screens/loginScreen'
import SignupScreen from '@screens/signupScreen'

const authFlow = createStackNavigator({
  Login: { screen: LoginScreen, navigationOptions: { header: null } },
  Signup: { screen: SignupScreen, navigationOptions: { header: null } }
})

const UnAuthenticatedApp = createAppContainer(authFlow)

export default UnAuthenticatedApp
