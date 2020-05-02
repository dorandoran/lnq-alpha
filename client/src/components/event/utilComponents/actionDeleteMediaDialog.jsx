import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

import useDeleteMedia from '@graphql/media/useDeleteMedia'
import useNotification from '@hooks/useNotification'
import useOverlay from '@context/overlayContext'

import LoadingDialog from '@components/overlay/loadingDialog'

import { theme, BUCKET } from '@util'
import { StyleSheet, View, Text } from 'react-native'
import { DialogConfirmActions } from '@common'

const ActionDeleteMediaDialog = () => {
  const {
    dispatch,
    actions,
    modal: { data },
    dialog: { cache }
  } = useOverlay()
  const { throwSuccess, throwError } = useNotification()
  const [deleteMedia, loading] = useDeleteMedia({
    onCompleted: () => {
      throwSuccess('Image successfully deleted.')
      handleClose(actions.dialog.clearCache)
    }
  })

  const handleConfirm = () => {
    if (data.avatarId === cache.id) {
      throwError('Cannot delete avatar image!')
      handleClose()
    } else {
      deleteMedia({ id: cache.id, linkId: data.id, bucket: BUCKET.EVENT })
    }
  }

  const handleClose = payload => {
    const action = { type: actions.dialog.close }
    if (payload) action.payload = payload
    dispatch(action)
  }

  if (loading) return <LoadingDialog />

  return (
    <Fragment>
      <View style={styles.messageContainer}>
        <Text style={styles.message}>
          Are you sure you want to delete this image?
        </Text>
      </View>
      <DialogConfirmActions
        handleConfirm={handleConfirm}
        handleClose={handleClose}
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

ActionDeleteMediaDialog.propTypes = {
  id: PropTypes.string,
  onComplete: PropTypes.func
}

export default ActionDeleteMediaDialog
