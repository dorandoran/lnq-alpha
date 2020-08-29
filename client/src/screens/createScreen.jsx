import React from 'react'
import PropTypes from 'prop-types'
import useCreate, { CreateProvider } from '@context/createContext'

import { View, StyleSheet } from 'react-native'
import CreateDetails from '@components/create/createDetails'
import CreateInvite from '@components/create/createInvite'
import Header from '@components/create/createHeader'

import { theme } from '@util'
import { SCREEN } from '@components/create/utilComponents/createUtil'

const CreateView = () => {
  const { screen } = useCreate()

  const renderScreen = () => {
    switch (screen) {
      case SCREEN.DETAILS:
        return <CreateDetails />
      case SCREEN.INVITES:
        return <CreateInvite />
      default:
        return <CreateDetails />
    }
  }

  return (
    <View style={styles.container}>
      <Header />
      {renderScreen()}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.color.background
  }
})

const CreateScreen = ({ route }) => {
  // This information is the initial information used to start an event.
  const initialMedia = route.params.params.media

  return (
    <CreateProvider initialMedia={initialMedia}>
      <CreateView />
    </CreateProvider>
  )
}

CreateScreen.propTypes = {
  route: PropTypes.object.isRequired
}

export default CreateScreen
