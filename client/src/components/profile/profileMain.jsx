import React from 'react'

import { useRouteState } from '@hooks/useRoute'

import EventList from '@components/profile/utilComponents/profileEventList'
import RSVPList from '@components/profile/utilComponents/profileResponseList'
import SavesList from '@components/profile/utilComponents/profileSavesList'
import ProfileTabs from '@components/profile/utilComponents/profileTabs'
import ProfileMenu from '@components/profile/profileMenu'
import ProfileAccountStats from '@components/profile/profileAccountStats'
import ProfileInformation from '@components/profile/profileInformation'

import { View, StyleSheet, ImageBackground } from 'react-native'
import { SCREEN_HEIGHT, SCREEN_WIDTH, theme } from '@util'
import { TABS } from '@components/profile/utilComponents/profileUtil'

const ProfileMain = () => {
  const { name } = useRouteState()
  const [tab, setTab] = React.useState(TABS.EVENTS)
  const [skip, setSkip] = React.useState(true)

  React.useEffect(() => {
    if (name === 'Profile') {
      setSkip(false)
    }

    return () => {
      setTab(TABS.EVENTS)
      setSkip(true)
    }
  }, [name])

  const renderTab = () => {
    switch (tab) {
      case TABS.EVENTS:
        return <EventList skip={skip} />
      case TABS.RSVP:
        return <RSVPList />
      case TABS.SAVES:
        return <SavesList />
      default:
        throw new Error('Something went wrong with the ProfileScreen.')
    }
  }

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../../assets/profile-main.png')}
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

export default ProfileMain
