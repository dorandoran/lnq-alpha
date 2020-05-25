/* eslint-disable no-undef */
import React from 'react'

import EventList from '@components/profile/utilComponents/profileEventList'
import RSVPList from '@components/profile/utilComponents/profileResponseList'
import SavesList from '@components/profile/utilComponents/profileSavesList'
import ProfileTabs from '@components/profile/utilComponents/profileTabs'
import ProfileMenu from '@components/profile/profileMenu'
import ProfileAccountStats from '@components/profile/profileAccountStats'
import ProfileInformation from '@components/profile/profileInformation'

import { View, StyleSheet, ImageBackground } from 'react-native'
import { SCREEN_HEIGHT, SCREEN_WIDTH, theme } from '@util'
import { tabs } from '@components/profile/utilComponents/profileUtil'

const ProfileScreen = () => {
  const [tab, setTab] = React.useState(tabs.events)

  const renderTab = () => {
    switch (tab) {
      case tabs.events:
        return <EventList />
      case tabs.rsvp:
        return <RSVPList />
      case tabs.saves:
        return <SavesList />
      default:
        throw new Error('Something went wrong with the ProfileScreen.')
    }
  }

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../assets/profile-main.png')}
        style={styles.image}
      >
        <ProfileMenu />
      </ImageBackground>
      <View style={styles.profileContainer}>
        <ProfileInformation />
        <ProfileAccountStats />
        <ProfileTabs currentTab={tab} setTab={setTab} />
        {renderTab()}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  image: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT / 6
  },
  profileContainer: {
    flex: 1,
    backgroundColor: theme.color.background,
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    marginTop: -20
  }
})

export default ProfileScreen
