import React from 'react'

import useCreate from '@context/createContext'
import useNotification from '@hooks/useNotification'
import useCreateEvent from '@graphql/event/useCreateEvent'

import { View, Keyboard, Text, StyleSheet } from 'react-native'
import { Icon } from 'react-native-elements'
import { Header, HeaderButton } from '@common'
import { theme, navigate } from '@util'
import { SCREEN } from '@components/create/utilComponents/createUtil'

const CreateHeader = () => {
  const [saved, setSaved] = React.useState(false)
  const { details, resetDetails, screen, setScreen } = useCreate()
  const { throwSuccess, throwLoading } = useNotification()
  const [createEvent, loading] = useCreateEvent({
    onCompleted: () => setSaved(true)
  })
  const isInvite = screen === SCREEN.INVITES

  React.useEffect(() => {
    if (saved) {
      throwSuccess('Event successfully created!')
      resetDetails()
      navigate('Profile')
    }

    return () => setSaved(false)
  }, [saved])

  React.useEffect(() => {
    if (loading) throwLoading()
  }, [loading])

  const handleCreatePress = () => {
    const { media, ...event } = details
    Keyboard.dismiss()
    createEvent({ ...event, image: media[0].file })
  }

  const navigateToInvite = () => {
    Keyboard.dismiss()
    setScreen(SCREEN.INVITES)
  }

  const goBack = () => {
    Keyboard.dismiss()
    setScreen(SCREEN.DETAILS)
  }

  const closeScreen = () => {
    Keyboard.dismiss()
    resetDetails()
    navigate('Home')
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
        <HeaderButton
          type='ionicon'
          name='md-share'
          color={theme.color.tertiary}
          backgroundColor={theme.color.shadow}
          onPress={handleCreatePress}
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
