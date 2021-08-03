import React from 'react'
import PropTypes from 'prop-types'

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

const ProfileMain = ({ modalActions }) => {
  const [tab, setTab] = React.useState(TABS.EVENTS)

  const renderTab = () => {
    switch (tab) {
      case TABS.EVENTS:
        return <EventList />
      case TABS.RSVP:
        return <RSVPList />
      case TABS.SAVES:
        return <SavesList />
      default:
        throw new Error('Something went wrong with the ProfileScreen.')
    }
  }

  return (
    <React.Fragment>
      <View style={styles.container}>
        <ImageBackground
          source={require('../../../assets/profile-main.png')}
          style={styles.image}
        >
          <ProfileMenu handlePress={modalActions.openMenu} />
        </ImageBackground>
        <View style={styles.profileContainer}>
          <ProfileInformation />
          <ProfileAccountStats />
          <ProfileTabs currentTab={tab} setTab={setTab} />
          {renderTab()}
        </View>
      </View>
    </React.Fragment>
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

ProfileMain.propTypes = {
  modalActions: PropTypes.object.isRequired
}

export default ProfileMain
