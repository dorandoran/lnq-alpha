import React from 'react'
import PropTypes from 'prop-types'
import useDialog from '@context/dialogContext'

import { theme } from '@src/theme'
import { View, StyleSheet } from 'react-native'
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '@util/constants'

import AddMediaDialog from '@components/event/utilComponents/actionAddMediaDialog'
import DeleteEvent from '@components/event/utilComponents/actionDeleteEventDialog'
import { ADD_MEDIA, DELETE_EVENT } from '@components/modal/modalUtil'

const EventDialog = () => {
  const { modalDialog, closeModalDialog } = useDialog()
  const { id, dialog } = modalDialog

  const closeDialog = () => {
    closeModalDialog()
  }

  const renderDialog = () => {
    switch (dialog) {
      case ADD_MEDIA:
        return <AddMediaDialog onComplete={closeDialog} id={id} />
      case DELETE_EVENT:
        return <DeleteEvent onComplete={closeDialog} id={id} />
      default:
        return null
    }
  }

  return id ? (
    <View style={styles.container}>
      <View style={styles.dialogContainer}>{renderDialog()}</View>
    </View>
  ) : null
}

const styles = StyleSheet.create({
  container: {
    height: SCREEN_HEIGHT,
    width: SCREEN_WIDTH,
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  dialogContainer: {
    backgroundColor: theme.color.accent,
    borderRadius: 25,
    alignItems: 'center',
    padding: '3%'
  }
})

EventDialog.propTypes = {
  onClose: PropTypes.func
}

export default EventDialog
