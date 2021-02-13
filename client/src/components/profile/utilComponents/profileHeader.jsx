import React from 'react'
import useProfile, { actions } from '@context/profileContext'

import { Keyboard, StyleSheet, Text } from 'react-native'
import { Header, HeaderButton } from '@common'
import { theme } from '@util'
import { SCREEN } from '@components/profile/utilComponents/profileUtil'

const ProfileHeader = () => {
  const { profileState, dispatch } = useProfile()
  const isInbox = profileState.screen === SCREEN.INBOX
  const isMessage = profileState.screen === SCREEN.MESSAGE

  const handleBackPress = () => {
    Keyboard.dismiss()
    if (isMessage) {
      dispatch({ type: actions.navigateInbox })
    } else {
      dispatch({ type: actions.navigateMain })
    }
  }

  const handleNewMessagePress = () => {
    Keyboard.dismiss()
    dispatch({ type: actions.navigateNewMessage })
  }

  return (
    <Header position='relative' backgroundColor='background'>
      <HeaderButton
        type='material'
        name='chevron-left'
        color='tertiary'
        backgroundColor='shadow'
        onPress={handleBackPress}
        size={30}
      />
      <Text style={styles.header}>{profileState.title}</Text>
      {isInbox && (
        <HeaderButton
          type='feather'
          name='plus'
          color='tertiary'
          backgroundColor='shadow'
          onPress={handleNewMessagePress}
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

export default ProfileHeader
