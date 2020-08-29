import React from 'react'
import useProfile, { actions } from '@context/profileContext'

import { Keyboard, StyleSheet, Text } from 'react-native'
import { Header, HeaderButton } from '@common'
import { theme } from '@util'

const ProfileHeader = () => {
  const { dispatch } = useProfile()

  const handleBackPress = () => {
    Keyboard.dismiss()
    dispatch({ type: actions.navigateMain })
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
      {<Text style={styles.header}>Notifications</Text>}
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
