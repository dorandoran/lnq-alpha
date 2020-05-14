import React, { Fragment } from 'react'

import Dialog from '@components/overlay/authDialog'

// Navigators
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { navigationRef } from '@util'

// Screens
import LoginScreen from '@screens/loginScreen'
import SignupScreen from '@screens/signupScreen'

const Stack = createStackNavigator()

const authFlow = () => {
  return (
    <Fragment>
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator headerMode='none' initialRouteName='Login'>
          <Stack.Screen name='Login' component={LoginScreen} />
          <Stack.Screen name='Signup' component={SignupScreen} />
        </Stack.Navigator>
      </NavigationContainer>
      <Dialog />
    </Fragment>
  )
}

export default authFlow
