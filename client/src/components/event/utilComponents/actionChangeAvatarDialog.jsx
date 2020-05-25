import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

import useChangeAvatar from '@graphql/event/useChangeAvatar'
import useNotification from '@hooks/useNotification'
import useOverlay from '@context/overlayContext'

import LoadingDialog from '@components/overlay/loadingDialog'

import { theme } from '@util'
import { StyleSheet, View, Text } from 'react-native'
import { DialogConfirmActions } from '@common'

const ActionChangeAvatarDialog = () => {
  const {
    dispatch,
    actions,
    dialog: { cache },
    modal: { data }
  } = useOverlay()
  const { throwSuccess, throwError } = useNotification()
  const [changeAvatar, loading] = useChangeAvatar({
    onCompleted: () => {
      throwSuccess('Avatar successfully changed')
      handleClose()
    }
  })

  const handleConfirm = () => {
    if (!cache.isAvatar) {
      changeAvatar({ id: data.id, mediaId: cache.id })
    } else {
      throwError('This is the event avatar')
    }
  }

  const handleClose = () => {
    dispatch({ type: actions.dialog.close })
  }

  if (loading) return <LoadingDialog />

  return (
    <Fragment>
      <View style={styles.messageContainer}>
        <Text style={styles.message}>Use current as featured image?</Text>
      </View>
      <DialogConfirmActions
        handleClose={handleClose}
        handleConfirm={handleConfirm}
      />
    </Fragment>
  )
}

const styles = StyleSheet.create({
  messageContainer: {
    padding: '5%'
  },
  message: {
    textAlign: 'center',
    fontSize: 24,
    color: theme.color.tertiary
  }
})

ActionChangeAvatarDialog.propTypes = {
  id: PropTypes.string,
  onComplete: PropTypes.func
}

export default ActionChangeAvatarDialog