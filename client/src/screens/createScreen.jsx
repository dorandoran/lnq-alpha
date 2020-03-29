import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { CreateProvider } from '@context/createContext'

import CreateMedia from '@components/create/createMedia'
import CreateDetails from '@components/create/createDetails'
import CreateInvite from '@components/create/createInvite'

import Header from '@components/create/createHeader'

const Stack = createStackNavigator()

const CreateScreen = () => {
  return (
    <CreateProvider>
      <Header />
      <Stack.Navigator headerMode="none" initialRouteName="Create Details">
        <Stack.Screen
          test="test prop"
          name="Create Details"
          component={CreateDetails}
        />
        <Stack.Screen name="Create Media" component={CreateMedia} />
        <Stack.Screen name="Create Invite" component={CreateInvite} />
      </Stack.Navigator>
    </CreateProvider>
  )
}

export default CreateScreen
