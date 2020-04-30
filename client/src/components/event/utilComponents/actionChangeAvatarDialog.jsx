import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import useChangeAvatar from '@graphql/event/useChangeAvatar'
import useNotification from '@hooks/useNotification'
import useOverlay from '@context/overlayContext'

import LoadingDialog from '@components/overlay/loadingDialog'

import { theme } from '@util'
import { TouchableOpacity, StyleSheet, View, Text } from 'react-native'
import { Icon } from 'react-native-elements'

const ActionChangeAvatarDialog = () => {
  const {
    dispatch,
    actions,
    dialog: {
      cache: { media }
    },
    modal: {
      data: { id }
    }
  } = useOverlay()
  const { throwSuccess, throwError } = useNotification()
  const [changeAvatar, loading] = useChangeAvatar({
    onCompleted: () => {
      throwSuccess('Avatar successfully changed')
      handleClose({ isAvatar: true })
    }
  })

  const handleConfirm = () => {
    if (!media.isAvatar) {
      changeAvatar({ id, mediaId: media.id })
    } else {
      throwError('This is the event avatar')
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
        <Text style={styles.message}>Use current as featured image?</Text>
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

ActionChangeAvatarDialog.propTypes = {
  id: PropTypes.string,
  onComplete: PropTypes.func
}

export default ActionChangeAvatarDialog
