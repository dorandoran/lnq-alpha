import React from 'react'

import useCreate from '@context/createContext'
import useNotification from '@hooks/useNotification'
import ActionSaveEvent from '@components/create/utilComponents/actionSaveEvent'

import { View, Keyboard, Text, StyleSheet } from 'react-native'
import { Icon } from 'react-native-elements'
import { Header, HeaderButton } from '@common'
import { theme, navigate } from '@util'
import { SCREEN } from '@components/create/utilComponents/createUtil'

const CreateHeader = () => {
  const { details, resetDetails, screen, setScreen } = useCreate()
  const { throwSuccess, throwLoading } = useNotification()
  const isInvite = screen === SCREEN.INVITES

  const handleSuccess = () => {
    throwSuccess('Event successfully created!')
  }

  const closeScreen = () => {
    Keyboard.dismiss()
    resetDetails()
    navigate('Home')
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
    <Header position='relative' backgroundColor='background'>
      <HeaderButton
        type='material'
        name='chevron-left'
        color='tertiary'
        backgroundColor='shadow'
        onPress={isInvite ? goBack : closeScreen}
        size={30}
      />
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
        <HeaderButton
          type='material'
          name='person-add'
          color='tertiary'
          backgroundColor='shadow'
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

export default CreateHeader
