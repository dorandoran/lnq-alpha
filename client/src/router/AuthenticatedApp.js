import React from 'react'
// Navigators
import { createAppContainer } from 'react-navigation'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { Icon } from 'react-native-elements'

// Screens
import HomeScreen from '@screens/homeScreen'
import ProfileScreen from '@screens/profileScreen'
import CreateScreen from '@screens/createScreen'

import TabBar from '@components/TabBar'

const mainFlow = createBottomTabNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Icon type="ionicon" name="ios-home" color={tintColor} />
        )
      }
    },
    Profile: {
      screen: ProfileScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Icon type="ionicon" name="ios-albums" color={tintColor} />
        )
      }
    },
    Create: {
      screen: CreateScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Icon type="ionicon" name="md-add" color={tintColor} />
        )
      }
    }
  },
  {
    tabBarComponent: TabBar,
    tabBarOptions: {
      activeTintColor: '#dddd27',
      inactiveTintColor: '#d8d8d8'
    }
  }
)

const AuthenticatedApp = createAppContainer(mainFlow)

export default AuthenticatedApp
