import React from 'react'

// Navigators
import { createAppContainer } from 'react-navigation'
import { createBottomTabNavigator } from 'react-navigation-tabs'

// Screens
import HomeScreen from '@screens/homeScreen'
import ProfileScreen from '@screens/profileScreen'
import CreateScreen from '@screens/createScreen'

const mainFlow = createBottomTabNavigator({
  Home: HomeScreen,
  Profile: ProfileScreen,
  Create: CreateScreen
})

const AuthenticatedApp = createAppContainer(mainFlow)

export default AuthenticatedApp