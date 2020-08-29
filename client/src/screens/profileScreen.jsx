/* eslint-disable no-undef */
import React from 'react'
import useProfile, { ProfileProvider } from '@context/profileContext'

import ProfileMain from '@components/profile/profileMain'
import ProfileNotifications from '@components/profile/profileNotifications'
import Header from '@components/profile/utilComponents/profileHeader'

import { View, StyleSheet } from 'react-native'
import { theme } from '@util'
import { SCREEN } from '@components/profile/utilComponents/profileUtil'

const ProfileView = () => {
  const { profileState } = useProfile()
  const { screen } = profileState

  const renderScreen = () => {
    switch (screen) {
      case SCREEN.MAIN:
        return <ProfileMain />
      case SCREEN.NOTIFICATIONS:
        return <ProfileNotifications />
      default:
        return <ProfileMain />
    }
  }

  return (
    <View style={styles.container}>
      {screen !== SCREEN.MAIN && <Header />}
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

const ProfileScreen = () => {
  return (
    <ProfileProvider>
      <ProfileView />
    </ProfileProvider>
  )
}

export default ProfileScreen
