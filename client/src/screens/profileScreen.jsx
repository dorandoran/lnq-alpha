import React from 'react'
import useProfile from '@context/profileContext'
import useNotification from '@hooks/useNotification'
import useUser from '@context/userContext'

import ProfileMenuModal from '@components/profile/utilComponents/profileMenuModal'
import LogoutModal from '@components/profile/utilComponents/logoutModal'
import AddMediaModal from '@components/shared/addMediaModal'
import ConfirmationModal from '@components/shared/confirmationModalView'

import ProfileMain from '@components/profile/profileMain'
import Header from '@components/profile/utilComponents/profileHeader'
import ProfileEditForm from '@components/profile/profileEditForm'
import ProfileModalContainer from '@components/profile/utilComponents/profileModalContainer'

import { View, StyleSheet } from 'react-native'
import { theme, BUCKET, OPERATION } from '@util'
import { SCREEN } from '@components/profile/utilComponents/profileUtil'

const MODAL = {
  MENU: 'profileMenu',
  PICTURE: 'updatePicture',
  INFO: 'updateInformation',
  LOGOUT: 'logout',
  CONFIRMATION: 'confirmation'
}

const CONFIRMATION_MODAL_MESSAGE =
  'You have unsaved changes. Are you sure you want to exit?'

const ProfileScreen = () => {
  const { profileState, dispatch, actions, reset } = useProfile()
  const { throwSuccess } = useNotification()
  const { user, updateUserState } = useUser()
  const { modal, screen } = profileState

  const modalActions = {
    openMenu: () => dispatch({ type: actions.openModal, payload: MODAL.MENU }),
    openConfirmation: () =>
      dispatch({ type: actions.openModal, payload: MODAL.CONFIRMATION }),
    updatePicture: () =>
      dispatch({ type: actions.openModal, payload: MODAL.PICTURE }),
    updateInformation: () => dispatch({ type: actions.navigateEditForm }),
    logout: () => dispatch({ type: actions.openModal, payload: MODAL.LOGOUT }),
    cancelModal: () => dispatch({ type: actions.closeModal })
  }

  // Screen
  const renderScreen = () => {
    switch (screen) {
      case SCREEN.MAIN:
        return <ProfileMain modalActions={modalActions} />
      case SCREEN.EDIT:
        return <ProfileEditForm />
      default:
        return <ProfileMain />
    }
  }

  // Modal
  const onAddMediaCompleted = res => {
    throwSuccess('User avatar updated!')
    modalActions.cancelModal()
    updateUserState({ avatar: res.updateUserAvatar })
  }

  const handleConfirmationClose = () => {
    modalActions.cancelModal()
  }

  const handleConfirmationConfirm = () => {
    dispatch({ type: actions.navigateMain })
    reset()
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
      case MODAL.CONFIRMATION:
        return (
          <ConfirmationModal
            message={CONFIRMATION_MODAL_MESSAGE}
            handleClose={handleConfirmationClose}
            handleConfirm={handleConfirmationConfirm}
          />
        )
      case MODAL.INFO:
      default:
        return <View />
    }
  }

  return (
    <View style={styles.container}>
      {![SCREEN.MAIN].includes(screen) && (
        <Header modalActions={modalActions} />
      )}
      {renderScreen()}
      <ProfileModalContainer isVisible={!!modal}>
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
