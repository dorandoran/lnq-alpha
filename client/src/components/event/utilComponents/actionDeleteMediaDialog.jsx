import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import useDeleteMedia from '@graphql/media/useDeleteMedia'
import useNotification from '@hooks/useNotification'
import useOverlay from '@context/overlayContext'

import LoadingDialog from '@components/overlay/loadingDialog'

import { theme } from '@src/theme'
import { TouchableOpacity, StyleSheet, View, Text } from 'react-native'
import { Icon } from 'react-native-elements'
import { EVENT_CONST } from '@util/constants'

const ActionDeleteMediaDialog = () => {
  const {
    dispatch,
    actions,
    modal: { data },
    dialog: {
      cache: { media }
    }
  } = useOverlay()
  const { throwSuccess, throwError } = useNotification()
  const [deleteMedia, loading] = useDeleteMedia({
    onCompleted: () => {
      throwSuccess('Image successfully deleted.')
      handleClose(actions.dialog.clearCache)
    }
  })

  const handleConfirm = () => {
    if (data.avatarId === media.id) {
      throwError('Cannot delete avatar image!')
      handleClose()
    } else {
      deleteMedia({ id: media.id, linkId: data.id, bucket: EVENT_CONST })
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
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.iconContainer} onPress={handleClose}>
          <Icon
            type='ionicon'
            name='md-close'
            color={theme.color.error}
            reverse
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconContainer} onPress={handleConfirm}>
          <Icon
            type='ionicon'
            name='md-checkmark'
            color={theme.color.success}
            reverse
          />
        </TouchableOpacity>
      </View>
    </Fragment>
  )
}

const styles = StyleSheet.create({
  messageContainer: {
    padding: '5%'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  iconContainer: {
    paddingLeft: '10%',
    paddingRight: '10%'
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
