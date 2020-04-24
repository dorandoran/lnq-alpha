import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import CreateContext, { CreateProvider } from '@context/createContext'

import { View } from 'react-native'
import CreateDetails from '@components/create/createDetails'
import CreateInvite from '@components/create/createInvite'
import Header from '@components/create/createHeader'

import { theme } from '@src/theme'
import { screenMap } from '@components/create/utilComponents/createUtil'

const CreateView = ({ navigation }) => {
  const { screen } = useContext(CreateContext)
  const { DETAILS, INVITES } = screenMap

  const renderScreen = () => {
    switch (screen) {
      case DETAILS:
        return <CreateDetails />
      case INVITES:
        return <CreateInvite />
      default:
        return <CreateDetails />
    }
  }

  return (
    <View style={{ flex: 1, backgroundColor: theme.color.background }}>
      <Header navigation={navigation} />
      {renderScreen()}
    </View>
  )
}

CreateView.propTypes = {
  navigation: PropTypes.object.isRequired
}

const CreateScreen = ({ route, navigation }) => {
  // This is the uri and aspect ratio passed from <tabBarFab />.
  // This information is the initial information used to start an event.
  const initialMedia = route.params.params.media

  return (
    <CreateProvider initialMedia={initialMedia}>
      <CreateView navigation={navigation} />
    </CreateProvider>
  )
}

CreateScreen.propTypes = {
  route: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired
}

export default CreateScreen
