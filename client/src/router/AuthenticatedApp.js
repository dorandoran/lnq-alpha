import React from 'react'
import { navigationRef } from '@util'
import { useRouteDispatch } from '@hooks/useRoute'
import { TouchableWithoutFeedback, View } from 'react-native'

// Navigators
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

// Screens
import HomeScreen from '@screens/homeScreen'
import SearchScreen from '@screens/searchScreen'
import LocateScreen from '@screens/locateScreen'
import ProfileScreen from '@screens/profileScreen'
import CreateScreen from '@screens/createScreen'

import AppModal from '@components/overlay/appModal'
import TabBar from '@components/main/tabBar'

const Tab = createBottomTabNavigator()

const AuthenticatedApp = () => {
  const { dispatch, actions } = useRouteDispatch()

  console.log('rendered')

  const getActiveRouteName = state => {
    const route = state.routes[state.index]
    if (route.state) {
      // Dive into nested navigators
      return getActiveRouteName(route.state)
    }
    return route.name
  }

  const handlePressIn = () => {
    dispatch({ type: actions.closeFab })
  }

  return (
    <TouchableWithoutFeedback onPressIn={handlePressIn}>
      <View style={{ flex: 1 }}>
        <NavigationContainer
          ref={navigationRef}
          onStateChange={state => {
            // Updates the route context, so that the sibling, <TabBar />,
            // can use without rendering this component every time
            const route = getActiveRouteName(state)
            dispatch({ type: actions.updateRoute, payload: route })
          }}
        >
          <Tab.Navigator backBehavior='history' initialRouteName='Home'>
            <Tab.Screen
              name='Home'
              component={HomeScreen}
              options={{ tabBarVisible: false }}
            />
            <Tab.Screen
              name='Search'
              component={SearchScreen}
              options={{ tabBarVisible: false }}
            />
            <Tab.Screen
              name='Locate'
              component={LocateScreen}
              options={{ tabBarVisible: false }}
            />
            <Tab.Screen
              name='Profile'
              component={ProfileScreen}
              options={{ tabBarVisible: false }}
            />
            <Tab.Screen
              name='Create'
              component={CreateScreen}
              options={{ tabBarVisible: false }}
            />
          </Tab.Navigator>
        </NavigationContainer>
        <TabBar />
        <AppModal />
      </View>
    </TouchableWithoutFeedback>
  )
}

export default AuthenticatedApp
