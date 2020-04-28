import React from 'react'
import PropTypes from 'prop-types'
import useCreate from '@context/createContext'
import useNotification from '@hooks/useNotification'

import {
  View,
  Keyboard,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native'
import { Header } from '@common'
import { Icon } from 'react-native-elements'
import { theme } from '@util'

import ActionSaveEvent from '@components/create/utilComponents/actionSaveEvent'
import { SCREEN } from '@components/create/utilComponents/createUtil'

const CreateHeader = ({ navigation }) => {
  const { details, resetDetails, screen, setScreen } = useCreate()
  const { throwSuccess, throwLoading } = useNotification()
  const isInvite = screen === SCREEN.INVITES

  const handleSuccess = () => {
    throwSuccess('Event successfully created!')
  }

  const closeScreen = () => {
    Keyboard.dismiss()
    resetDetails()
    navigation.navigate('Home')
  }

  const navigateToInvite = () => {
    Keyboard.dismiss()
    setScreen(SCREEN.INVITES)
  }

  const goBack = () => {
    Keyboard.dismiss()
    setScreen(SCREEN.DETAILS)
  }

  // Checks if keys that have strings are filled
  // If not, disable button
  const checkDisabled = () => {
    let disabled = false
    Object.keys(details).forEach(key => {
      if (typeof details[key] === 'string' && !details[key].length) {
        disabled = true
      }
      if (details[key] == null) {
        disabled = true
      }
    })
    return disabled
  }

  return (
    <Header position='relative' backgroundColor={theme.color.background}>
      <TouchableOpacity
        style={styles.padding}
        onPress={isInvite ? goBack : closeScreen}
      >
        <Icon
          type='ionicon'
          name='ios-arrow-back'
          color={theme.color.tertiary}
        />
      </TouchableOpacity>
      {isInvite ? <Text style={styles.header}>Invite</Text> : <View />}
      {isInvite ? (
        <ActionSaveEvent
          onOpen={throwLoading}
          onComplete={closeScreen}
          onSuccess={handleSuccess}
        />
      ) : checkDisabled() ? (
        <Icon
          type='font-awesome'
          name='exclamation'
          color={theme.color.secondary}
        />
      ) : (
        <TouchableOpacity style={styles.padding} onPress={navigateToInvite}>
          <Icon
            type='material'
            name='person-add'
            color={theme.color.tertiary}
          />
        </TouchableOpacity>
      )}
    </Header>
  )
}

const styles = StyleSheet.create({
  header: {
    color: theme.color.tertiary,
    fontWeight: 'bold',
    fontSize: 18
  },
  padding: {
    padding: '1%',
    aspectRatio: 1
  }
})

CreateHeader.propTypes = {
  navigation: PropTypes.object.isRequired
}

export default CreateHeader
