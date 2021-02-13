/* eslint-disable no-undef */
import React from 'react'
import useProfile from '@context/profileContext'

import ProfileMain from '@components/profile/profileMain'
import Header from '@components/profile/utilComponents/profileHeader'

import { View, StyleSheet } from 'react-native'
import { theme } from '@util'
import { SCREEN } from '@components/profile/utilComponents/profileUtil'

const ProfileScreen = () => {
  const { profileState } = useProfile()
  const { screen } = profileState

  // TODO: Fix this
  const renderScreen = () => {
    switch (screen) {
      case SCREEN.MAIN:
        return <ProfileMain />
      default:
        return <ProfileMain />
    }
  }

  return (
    <View style={styles.container}>
      {![SCREEN.MAIN].includes(screen) && <Header />}
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

export default ProfileScreen
