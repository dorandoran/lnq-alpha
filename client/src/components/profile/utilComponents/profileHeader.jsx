import React from 'react'
import PropTypes from 'prop-types'
import isEqual from 'lodash/isEqual'
import useUpdateUser from '@graphql/user/useUpdateUser'
import useNotification from '@hooks/useNotification'
import useProfile, { actions } from '@context/profileContext'
import useUser from '@context/userContext'

import { Keyboard, StyleSheet, Text } from 'react-native'
import { Header, HeaderButton } from '@common'
import { theme } from '@util'
import { SCREEN } from '@components/profile/utilComponents/profileUtil'

const ProfileHeader = ({ modalActions }) => {
  const {
    profileState: { screen, title, form, initialUser },
    dispatch,
    reset
  } = useProfile()
  const { user, updateUserState } = useUser()
  const { throwSuccess, throwLoading } = useNotification()
  const [updateUser] = useUpdateUser({
    onCompleted: res => {
      throwSuccess('Profile updated!')
      updateUserState({ ...res.updateUser })
      dispatch({ type: actions.navigateMain })
    }
  })

  const getRightButtonProps = () => {
    switch (screen) {
      case SCREEN.INBOX:
        return {
          showRightButton: true,
          type: 'feather',
          name: 'plus',
          color: 'tertiary',
          backgroundColor: 'shadow',
          onPress: () => {
            Keyboard.dismiss()
            dispatch({ type: actions.navigateNewMessage })
          },
          onBackPress: () => dispatch({ type: actions.navigateMain })
        }
      case SCREEN.EDIT:
        return {
          showRightButton: true,
          type: 'material',
          name: 'done',
          color: 'success',
          backgroundColor: 'shadow',
          onPress: () => {
            Keyboard.dismiss()
            throwLoading()
            updateUser({
              id: user.id,
              updates: { ...form, avatar: form.avatar.file }
            })
            reset()
          },
          onBackPress: () => {
            if (!isEqual(initialUser, form)) {
              modalActions.openConfirmation()
            } else {
              reset()
            }
          }
        }
      case SCREEN.MESSAGE:
        return {
          showRightButton: false,
          onBackPress: () => dispatch({ type: actions.navigateInbox })
        }
      default:
        return {
          showRightButton: false,
          onBackPress: () => {}
        }
    }
  }

  const { onBackPress, showRightButton, ...rightButtonProps } =
    getRightButtonProps()

  return (
    <Header position='relative' backgroundColor='background'>
      <HeaderButton
        type='material'
        name='chevron-left'
        color='tertiary'
        backgroundColor='shadow'
        onPress={onBackPress}
        size={30}
      />
      <Text style={styles.header}>{title}</Text>
      {showRightButton && <HeaderButton {...rightButtonProps} />}
    </Header>
  )
}

const styles = StyleSheet.create({
  header: {
    color: theme.color.tertiary,
    fontWeight: 'bold',
    fontSize: 18
  }
})

ProfileHeader.propTypes = {
  modalActions: PropTypes.object.isRequired
}

export default ProfileHeader
