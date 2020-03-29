import React, { useRef, useState, useEffect, useContext } from 'react'
import { Route } from '@context/routeStore'

// Navigators
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

// Screens
import HomeScreen from '@screens/homeScreen'
import SearchScreen from '@screens/searchScreen'
import LocateScreen from '@screens/locateScreen'
import ProfileScreen from '@screens/profileScreen'
import CreateScreen from '@screens/createScreen'

import TabBar from '@components/tabBar'

const Tab = createBottomTabNavigator()

const mainFlow = () => {
  const [loaded, setLoaded] = useState(false)
  const ref = useRef(null)
  const routeDispatch = useContext(Route.Dispatch)
  console.log('run')
  // This is done to set the NavigationContainer ref after loading
  useEffect(() => {
    if (!loaded) {
      setLoaded(true)
    }
  }, [])

  const getActiveRouteName = state => {
    const route = state.routes[state.index]
    if (route.state) {
      // Dive into nested navigators
      return getActiveRouteName(route.state)
    }
    return route.name
  }

  return (
    <React.Fragment>
      <NavigationContainer
        ref={ref}
        onStateChange={state => {
          // Updates the route context, so that a sibling <TabBar /> can use
          // without rerendering this component every time
          const route = getActiveRouteName(state)
          routeDispatch({ type: 'changeRoute', payload: route })
        }}
      >
        <Tab.Navigator backBehavior="history" initialRouteName="Home">
          <Tab.Screen
            name="Home"
            component={HomeScreen}
            options={{ tabBarVisible: false }}
          />
          <Tab.Screen
            name="Search"
            component={SearchScreen}
            options={{ tabBarVisible: false }}
          />
          <Tab.Screen
            name="Locate"
            component={LocateScreen}
            options={{ tabBarVisible: false }}
          />
          <Tab.Screen
            name="Profile"
            component={ProfileScreen}
            options={{ tabBarVisible: false }}
          />
          <Tab.Screen
            name="Create"
            component={CreateScreen}
            options={{ tabBarVisible: false }}
          />
        </Tab.Navigator>
      </NavigationContainer>
      <TabBar mainFlowRef={ref} />
    </React.Fragment>
  )
}

export default mainFlow
