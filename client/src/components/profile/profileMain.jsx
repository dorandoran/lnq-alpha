import React from 'react'
import { useRouteState } from '@hooks/useRoute'
import useUser from '@context/userContext'
import useNotification from '@hooks/useNotification'
import useAuth from '@context/authContext'

import EventList from '@components/profile/utilComponents/profileEventList'
import RSVPList from '@components/profile/utilComponents/profileResponseList'
import SavesList from '@components/profile/utilComponents/profileSavesList'
import ProfileTabs from '@components/profile/utilComponents/profileTabs'
import ProfileMenu from '@components/profile/profileMenu'
import ProfileAccountStats from '@components/profile/profileAccountStats'
import ProfileInformation from '@components/profile/profileInformation'

import ProfileModalContainer from '@components/profile/utilComponents/profileModalContainer'
import ProfileMenuModal from '@components/profile/utilComponents/profileMenuModal'
import LogoutModal from '@components/profile/utilComponents/logoutModal'
import AddMediaModal from '@components/shared/addMediaModal'

import { View, StyleSheet, ImageBackground } from 'react-native'
import { SCREEN_HEIGHT, SCREEN_WIDTH, BUCKET, OPERATION, theme } from '@util'
import { TABS } from '@components/profile/utilComponents/profileUtil'

const MODAL = {
  MENU: 'profileMenu',
  PICTURE: 'updatePicture',
  INFO: 'updateInformation',
  LOGOUT: 'logout'
}

const ProfileMain = () => {
  const { name } = useRouteState()
  const [tab, setTab] = React.useState(TABS.EVENTS)
  const [modal, setModal] = React.useState('')
  const [skip, setSkip] = React.useState(true)
  const user = useUser()
  const { refetchUser } = useAuth()
  const { throwSuccess } = useNotification()

  React.useEffect(() => {
    if (name === 'Profile') {
      setSkip(false)
    }

    return () => {
      setTab(TABS.EVENTS)
      setSkip(true)
    }
  }, [name])

  const modalActions = {
    openMenu: () => setModal(MODAL.MENU),
    updatePicture: () => setModal(MODAL.PICTURE),
    updateInformation: () => setModal(MODAL.INFO),
    logout: () => setModal(MODAL.LOGOUT),
    cancelModal: () => setModal('')
  }

  const onAddMediaCompleted = () => {
    throwSuccess('User avatar updated!')
    modalActions.cancelModal()
    refetchUser()
  }

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

  const renderModal = () => {
    switch (modal) {
      case MODAL.MENU:
        return <ProfileMenuModal modalActions={modalActions} />
      case MODAL.LOGOUT:
        return <LogoutModal modalActions={modalActions} />
      case MODAL.PICTURE:
        return (
          <AddMediaModal
            entity={user}
            bucketType={BUCKET.USER}
            operation={OPERATION.UPDATE}
            modalActions={modalActions}
            onCompleted={onAddMediaCompleted}
          />
        )
      case MODAL.INFO:
      default:
        return <View />
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
      <ProfileModalContainer isVisible={!!modal}>
        {renderModal()}
      </ProfileModalContainer>
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

export default ProfileMain
