import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import useDeleteMedia from '@graphql/media/useDeleteMedia'
import useNotification from '@hooks/useNotification'
import useDialog from '@context/dialogContext'

import { theme } from '@src/theme'
import { TouchableOpacity, StyleSheet, View, Text } from 'react-native'
import { Icon } from 'react-native-elements'

const ActionDeleteMediaDialog = ({ onComplete }) => {
  const {
    temp: { event, media }
  } = useDialog()
  const deleteMedia = useDeleteMedia()
  const { throwSuccess, throwError } = useNotification()

  const handleConfirm = () => {
    if (event.avatarId === media.id) {
      throwError('Cannot delete avatar image!')
    } else {
      deleteMedia({ id: media.id, linkId: event.id, bucket: 'events' })
      throwSuccess('Image successfully deleted.')
    }
    onComplete()
  }

  return (
    <Fragment>
      <View style={styles.messageContainer}>
        <Text style={styles.message}>
          Are you sure you want to delete this image?
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.iconContainer} onPress={onComplete}>
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
