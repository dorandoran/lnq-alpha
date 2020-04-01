import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { CreateProvider } from '@context/createContext'

import CreateDetails from '@components/create/createDetails'
import CreateInvite from '@components/create/createInvite'

const Stack = createStackNavigator()

const CreateScreen = () => {
  return (
    <CreateProvider>
      <Stack.Navigator headerMode="none" initialRouteName="Create Details">
        <Stack.Screen name="Create Details" component={CreateDetails} />
        <Stack.Screen name="Create Invite" component={CreateInvite} />
      </Stack.Navigator>
    </CreateProvider>
  )
}

export default CreateScreen
