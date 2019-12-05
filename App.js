// Navigators
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs'
// navigationRef utility tool that will help us use navigation outside of our screens
import { setNavigator } from './src/navigationRef'
import { Provider as AuthProvider } from './src/context/AuthContext'
import React from 'react'
import { theme } from '@src/theme'
import { ThemeProvider } from 'react-native-elements'

// Screens
import LoginScreen from '@screens/loginScreen'
import SignupScreen from '@screens/signupScreen'
import HomeScreen from '@screens/homeScreen'
import ProfileScreen from '@screens/profileScreen'
import CreateScreen from '@screens/createScreen'

// Services
import { initializeFirebase } from '@services/firebase'

const switchNavigator = createSwitchNavigator({
  authFlow: createStackNavigator({
    Login: LoginScreen,
    Signup: SignupScreen
  }),
  mainFlow: createBottomTabNavigator({
    Home: HomeScreen,
    Profile: ProfileScreen,
    Create: CreateScreen,
  })
})

const App = createAppContainer(switchNavigator)

export default () => {
  initializeFirebase()

  // setNavigator helper func that will allow us to use navigate prop in Context files
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <App ref={navigator => setNavigator(navigator)} />
      </ThemeProvider>
    </AuthProvider>
  )
}

