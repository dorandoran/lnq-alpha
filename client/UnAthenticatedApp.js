import React from 'react'

// Navigators
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

// Screens
import LoginScreen from '@screens/loginScreen'
import SignupScreen from '@screens/signupScreen'


const authFlow = createStackNavigator({
  Login: LoginScreen,
  Signup: SignupScreen
})

const UnAuthenticatedApp = createAppContainer(authFlow)

export default UnAuthenticatedApp
