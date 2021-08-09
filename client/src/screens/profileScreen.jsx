import React, { Suspense } from 'react'
import dayjs from 'dayjs'

import useOverlay from '@context/overlayContext'
import useProfile from '@context/profileContext'
import useUser from '@context/userContext'

import ProfileMenuModal from '@components/profile/utilComponents/profileMenuModal'
import LogoutModal from '@components/profile/utilComponents/logoutModal'
import MediaSourceSelect from '@components/profile/utilComponents/profileMediaSourceSelect'
import FollowList from '@components/profile/profileFollowList'
import ConfirmationModal from '@components/shared/confirmationModalView'
import ItemListView from '@components/shared/itemListView'

import Header from '@components/profile/utilComponents/profileHeader'
import ProfileEditForm from '@components/profile/profileEditForm'
import ProfileModalContainer from '@components/profile/utilComponents/profileModalContainer'

import { View, StyleSheet } from 'react-native'
import { theme, BUCKET } from '@util'
import { SCREEN } from '@components/profile/utilComponents/profileUtil'
import { Loading } from '@common'

const ProfileMain = React.lazy(() => import('@components/profile/profileMain'))

const MODAL = {
  MENU: 'profileMenu',
  AVATAR: 'updateAvatar',
  LOGOUT: 'logout',
  CONFIRMATION: 'confirmation'
}

const MESSAGES = {
  CONFIRMATION_MODAL:
    'You have unsaved changes. Are you sure you want to exit?',
  EVENTS_NO_DATA: 'No past events to show'
}

const ProfileScreen = () => {
  const {
    user: { events, username }
  } = useUser()
  const { profileState, dispatch, actions, reset } = useProfile()
  const { dispatch: overlayDispatch, actions: overlayActions } = useOverlay()
  const { modal, screen } = profileState

  const modalActions = {
    openMenu: () => dispatch({ type: actions.openModal, payload: MODAL.MENU }),
    openConfirmation: () =>
      dispatch({ type: actions.openModal, payload: MODAL.CONFIRMATION }),
    openUpdateAvatar: () =>
      dispatch({ type: actions.openModal, payload: MODAL.AVATAR }),
    updateAvatar: avatar =>
      dispatch({ type: actions.updateEditForm, payload: { avatar } }),
    navigateEditForm: () =>
      dispatch({ type: actions.navigate, payload: SCREEN.EDIT }),
    navigateFollowing: () =>
      dispatch({
        type: actions.navigate,
        payload: {
          screen: SCREEN.FOLLOWING,
          title: username ? `@${username}` : 'No Username'
        }
      }),
    navigateFollowers: () =>
      dispatch({
        type: actions.navigate,
        payload: {
          screen: SCREEN.FOLLOWERS,
          title: username ? `@${username}` : 'No Username'
        }
      }),
    navigatePastEvents: () =>
      dispatch({ type: actions.navigate, payload: SCREEN.EVENTS }),
    logout: () => dispatch({ type: actions.openModal, payload: MODAL.LOGOUT }),
    cancelModal: () => dispatch({ type: actions.closeModal })
  }

  const eventList = events.filter(event => dayjs(event.date).isBefore(dayjs()))

  const handleEventPress = item => {
    overlayDispatch({
      type: overlayActions.modal.open,
      payload: { data: item, type: BUCKET.EVENT }
    })
  }

  const handleModalClose = () => {
    modalActions.cancelModal()
  }

  const handleConfirmationConfirm = () => {
    dispatch({ type: actions.navigateMain })
    reset()
  }

  // Screen
  const renderScreen = () => {
    switch (screen) {
      case SCREEN.MAIN:
        return <ProfileMain modalActions={modalActions} />
      case SCREEN.EDIT:
        return <ProfileEditForm modalActions={modalActions} />
      case SCREEN.FOLLOWERS:
      case SCREEN.FOLLOWING:
        return <FollowList initialTab={screen} />
      case SCREEN.EVENTS:
        return (
          <ItemListView
            type={BUCKET.EVENT}
            data={eventList}
            noDataMessage={MESSAGES.EVENTS_NO_DATA}
            handleItemPress={handleEventPress}
            hideAvatar
          />
        )
      default:
        return <ProfileMain modalActions={modalActions} />
    }
  }

  // Modal
  const renderModal = () => {
    switch (modal) {
      case MODAL.MENU:
        return <ProfileMenuModal modalActions={modalActions} />
      case MODAL.LOGOUT:
        return <LogoutModal modalActions={modalActions} />
      case MODAL.AVATAR:
        return <MediaSourceSelect handleSelect={modalActions.updateAvatar} />
      case MODAL.CONFIRMATION:
        return (
          <ConfirmationModal
            message={MESSAGES.CONFIRMATION_MODAL}
            handleClose={handleModalClose}
            handleConfirm={handleConfirmationConfirm}
          />
        )
      default:
        return <View />
    }
  }

  return (
    <View style={styles.container}>
      {![SCREEN.MAIN].includes(screen) && (
        <Header modalActions={modalActions} />
      )}
      <Suspense fallback={<Loading />}>{renderScreen()}</Suspense>
      <ProfileModalContainer
        isVisible={!!modal}
        onBackdropPress={modalActions.cancelModal}
      >
        {renderModal()}
      </ProfileModalContainer>
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
