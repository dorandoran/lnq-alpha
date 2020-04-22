import React, { useContext } from 'react'
import DialogContext from '@context/dialogContext'

import { theme } from '@src/theme'
import { View, StyleSheet } from 'react-native'
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '@util/constants'

import SelectMediaDialog from '@components/event/utilComponents/actionAddMediaDialog'
import DeleteEvent from '@components/event/utilComponents/actionDeleteEventDialog'
import { ADD_MEDIA, DELETE_EVENT } from '@components/modal/modalUtil'

const EventDialog = () => {
  const { modalDialog, closeModalDialog } = useContext(DialogContext)
  const { id, dialog } = modalDialog

  const renderDialog = () => {
    switch (dialog) {
      case ADD_MEDIA:
        return <SelectMediaDialog onComplete={closeModalDialog} id={id} />
      case DELETE_EVENT:
        return <DeleteEvent onComplete={closeModalDialog} id={id} />
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

export default EventDialog
