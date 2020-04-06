import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import CreateContext from '@context/createContext'

import { View, Keyboard, Text, StyleSheet } from 'react-native'
import Header from '@common/header'
import { Icon } from 'react-native-elements'
import { theme } from '@src/theme'

import ActionSaveEvent from '@components/create/utilComponents/actionSaveEvent'
import { screenMap } from '@components/create/utilComponents/createUtil'

const CreateHeader = ({ navigation }) => {
  const { details, resetDetails, screen, setScreen } = useContext(CreateContext)
  const { INVITES, DETAILS } = screenMap
  const isInvite = screen === INVITES

  const closeScreen = () => {
    Keyboard.dismiss()
    resetDetails()
    navigation.navigate('Home')
  }

  const navigateToInvite = () => {
    Keyboard.dismiss()
    setScreen(INVITES)
  }

  const goBack = () => {
    Keyboard.dismiss()
    setScreen(DETAILS)
  }

  // Checks if keys that have strings are filled
  // If not, disable button
  const checkDisabled = () => {
    let disabled = false
    Object.keys(details).forEach(key => {
      if (typeof details[key] === 'string' && !details[key].length) {
        disabled = true
      }
    })
    return disabled
  }

  return (
    <Header position="relative" backgroundColor={theme.color.background}>
      <Icon
        type="ionicon"
        name="ios-arrow-back"
        color={theme.color.tertiary}
        onPress={isInvite ? goBack : closeScreen}
      />
      {isInvite ? <Text style={styles.header}>Invite</Text> : <View />}
      {isInvite ? (
        <ActionSaveEvent onComplete={closeScreen} />
      ) : checkDisabled() ? (
        <Icon
          type="font-awesome"
          name="exclamation"
          color={theme.color.secondary}
        />
      ) : (
        <Icon
          type="material"
          name="person-add"
          color={theme.color.tertiary}
          onPress={navigateToInvite}
        />
      )}
    </Header>
  )
}

const styles = StyleSheet.create({
  header: {
    color: theme.color.tertiary,
    fontWeight: 'bold',
    fontSize: 18
  }
})

CreateHeader.propTypes = {
  navigation: PropTypes.object.isRequired
}

export default CreateHeader
