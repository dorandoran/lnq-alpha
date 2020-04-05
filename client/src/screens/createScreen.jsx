import React from 'react'
import PropTypes from 'prop-types'
import { createStackNavigator } from '@react-navigation/stack'
import { CreateProvider } from '@context/createContext'

import CreateDetails from '@components/create/createDetails'
import CreateInvite from '@components/create/createInvite'
import Header from '@components/create/createHeader'

const Stack = createStackNavigator()

const CreateScreen = ({ route }) => {
  // This is the uri and aspect ratio passed from <tabBarFab />.
  // This information is the initial information used to start an event.
  const initialMedia = route.params.params.media

  return (
    <CreateProvider initialMedia={initialMedia}>
      <Header />
      <Stack.Navigator headerMode="none" initialRouteName="Create Details">
        <Stack.Screen name="Create Details" component={CreateDetails} />
        <Stack.Screen name="Create Invite" component={CreateInvite} />
      </Stack.Navigator>
    </CreateProvider>
  )
}

CreateScreen.propTypes = {
  route: PropTypes.object.isRequired
}

export default CreateScreen
