import React from 'react'
import PropTypes from 'prop-types'

import useUser from '@context/userContext'
import useOverlay from '@context/overlayContext'

import ItemList from '@components/shared/itemList'
import RSVPList from '@components/profile/utilComponents/profileResponseList'
import ProfileTabs from '@components/profile/utilComponents/profileTabs'
import ProfileMenu from '@components/profile/profileMenu'
import ProfileAccountStats from '@components/profile/profileAccountStats'
import ProfileInformation from '@components/profile/profileInformation'

import { View, StyleSheet, ImageBackground } from 'react-native'
import { BUCKET, SCREEN_HEIGHT, SCREEN_WIDTH, theme } from '@util'
import { TABS } from '@components/profile/utilComponents/profileUtil'

const NO_DATA = {
  EVENTS: 'You have no upcoming created events.',
  BOOKMARK: 'Nothing bookmarked.'
}

const ProfileMain = ({ modalActions }) => {
  const [tab, setTab] = React.useState(TABS.EVENTS)
  const { dispatch: overlayDispatch, actions: overlayActions } = useOverlay()
  const {
    user: { events, bookmarkEvents }
  } = useUser()

  const handleEventPress = item => {
    overlayDispatch({
      type: overlayActions.modal.open,
      payload: { data: item, type: BUCKET.EVENT }
    })
  }

  const renderTab = () => {
    switch (tab) {
      case TABS.EVENTS:
        return (
          <ItemList
            data={events}
            onItemPress={handleEventPress}
            noDataMessage={NO_DATA.EVENTS}
          />
        )
      case TABS.RSVP:
        return <RSVPList />
      case TABS.BOOKMARK:
        return (
          <ItemList
            data={bookmarkEvents}
            onItemPress={handleEventPress}
            noDataMessage={NO_DATA.BOOKMARK}
          />
        )
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
