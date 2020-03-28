import React from 'react'

// Navigators
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

// Screens
import HomeScreen from '@screens/homeScreen'
import ProfileScreen from '@screens/profileScreen'
import CreateScreen from '@screens/createScreen'

import { Icon } from 'react-native-elements'
import TabBar from '@components/TabBar'

const Tab = createBottomTabNavigator()

const mainFlow = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        backBehavior="none"
        tabBar={props => <TabBar {...props} />}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ tintColor }) => (
              <Icon type="ionicon" name="ios-home" color={tintColor} />
            )
          }}
        />
        {/* <Tab.Screen name="Search" component={SearchScreen} /> */}
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarIcon: ({ tintColor }) => (
              <Icon type="ionicon" name="ios-albums" color={tintColor} />
            )
          }}
        />
        <Tab.Screen
          name="Create"
          component={CreateScreen}
          options={{
            tabBarIcon: ({ tintColor }) => (
              <Icon type="ionicon" name="md-add" color={tintColor} />
            )
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  )
}

export default mainFlow
