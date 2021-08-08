import React, { Suspense } from 'react'
import useProfile from '@context/profileContext'

import { GetFollowing, GetFollowers } from '@graphql/follow/queries'

import ProfileMenuModal from '@components/profile/utilComponents/profileMenuModal'
import LogoutModal from '@components/profile/utilComponents/logoutModal'
import MediaSourceSelect from '@components/profile/utilComponents/profileMediaSourceSelect'
import ConfirmationModal from '@components/shared/confirmationModalView'
import ItemListView from '@components/shared/itemListView'

import Header from '@components/profile/utilComponents/profileHeader'
import ProfileEditForm from '@components/profile/profileEditForm'
import ProfileModalContainer from '@components/profile/utilComponents/profileModalContainer'

import { View, StyleSheet } from 'react-native'
import { theme } from '@util'
import { SCREEN } from '@components/profile/utilComponents/profileUtil'
import { Loading } from '@common'

const ProfileMain = React.lazy(() => import('@components/profile/profileMain'))

const MODAL = {
  MENU: 'profileMenu',
  AVATAR: 'updateAvatar',
  LOGOUT: 'logout',
  CONFIRMATION: 'confirmation'
}

const CONFIRMATION_MODAL_MESSAGE =
  'You have unsaved changes. Are you sure you want to exit?'

const ProfileScreen = () => {
  const { profileState, dispatch, actions, reset } = useProfile()
  const { modal, screen } = profileState

  const modalActions = {
    openMenu: () => dispatch({ type: actions.openModal, payload: MODAL.MENU }),
    openConfirmation: () =>
      dispatch({ type: actions.openModal, payload: MODAL.CONFIRMATION }),
    openUpdateAvatar: () =>
      dispatch({ type: actions.openModal, payload: MODAL.AVATAR }),
    updateAvatar: avatar =>
      dispatch({ type: actions.updateEditForm, payload: { avatar } }),
    navigateEditForm: () => dispatch({ type: actions.navigateEditForm }),
    navigateFollowing: () => dispatch({ type: actions.navigateFollowing }),
    navigateFollowers: () => dispatch({ type: actions.navigateFollowers }),
    logout: () => dispatch({ type: actions.openModal, payload: MODAL.LOGOUT }),
    cancelModal: () => dispatch({ type: actions.closeModal })
  }

  // Screen
  const renderScreen = () => {
    switch (screen) {
      case SCREEN.MAIN:
        return <ProfileMain modalActions={modalActions} />
      case SCREEN.EDIT:
        return <ProfileEditForm modalActions={modalActions} />
      case SCREEN.FOLLOWING:
        return (
          <ItemListView
            query={GetFollowing}
            noDataMessage='Not following anyone!'
            filterList={filterFollowingList}
            handleItemPress={() => {}}
          />
        )
      case SCREEN.FOLLOWERS:
        return (
          <ItemListView
            query={GetFollowers}
            noDataMessage='No followers, yet!'
            filterList={filterFollowerList}
            handleItemPress={() => {}}
          />
        )
      default:
        return <ProfileMain modalActions={modalActions} />
    }
  }

  const handleModalClose = () => {
    modalActions.cancelModal()
  }

  const handleConfirmationConfirm = () => {
    dispatch({ type: actions.navigateMain })
    reset()
  }

  const filterFollowingList = list => list.map(follow => follow.recipient)
  const filterFollowerList = list => list.map(follow => follow.sender)

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
            message={CONFIRMATION_MODAL_MESSAGE}
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
