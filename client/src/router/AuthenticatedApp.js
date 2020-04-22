import React from 'react'
import { Route } from '@context/routeStore'
import { DialogProvider } from '@context/dialogContext'

// Navigators
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

// Screens
import HomeScreen from '@screens/homeScreen'
import SearchScreen from '@screens/searchScreen'
import LocateScreen from '@screens/locateScreen'
import ProfileScreen from '@screens/profileScreen'
import CreateScreen from '@screens/createScreen'

import AppModal from '@components/modal/appModal'
import TabBar from '@components/main/tabBar'

const Tab = createBottomTabNavigator()

const AuthenticatedApp = () => {
  const [loaded, setLoaded] = React.useState(false)
  const ref = React.useRef(null)
  const routeDispatch = React.useContext(Route.Dispatch)

  console.log('run')
  // This is done to set the NavigationContainer ref after loading
  React.useEffect(() => {
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
    <DialogProvider>
      <NavigationContainer
        ref={ref}
        onStateChange={state => {
          // Updates the route context, so that a sibling <TabBar /> can use
          // without rerendering this component every time
          const route = getActiveRouteName(state)
          routeDispatch({ type: 'changeRoute', payload: route })
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
      <TabBar mainFlowRef={ref} />
      <AppModal />
    </DialogProvider>
  )
}

export default AuthenticatedApp
