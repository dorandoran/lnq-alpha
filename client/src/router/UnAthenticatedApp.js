import React from 'react'

// Navigators
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

// Screens
import LoginScreen from '@screens/loginScreen'
import SignupScreen from '@screens/signupScreen'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const Stack = createStackNavigator()

const authFlow = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default authFlow
