import React from 'react'
import { theme } from '@src/theme'
import { ThemeProvider } from 'react-native-elements'

// Navigators
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs'

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

const AppContainer = createAppContainer(switchNavigator)

const App = () => {
  initializeFirebase()
  
  return (
    <ThemeProvider theme={theme}>
      <AppContainer />
    </ThemeProvider>
  )
}

export default App