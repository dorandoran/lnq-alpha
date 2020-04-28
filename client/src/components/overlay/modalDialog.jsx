import React from 'react'
import PropTypes from 'prop-types'
import useOverlay from '@context/overlayContext'

import { theme } from '@util'
import { View, StyleSheet } from 'react-native'
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '@util/constants'

import AddMediaDialog from '@components/event/utilComponents/actionAddMediaDialog'
import DeleteMedia from '@components/event/utilComponents/actionDeleteMediaDialog'

const EventDialog = () => {
  const { dialog, actions } = useOverlay()

  const renderDialog = () => {
    switch (dialog.id) {
      case actions.dialog.events.addMedia:
        return <AddMediaDialog />
      case actions.dialog.events.deleteMedia:
        return <DeleteMedia />
      default:
        return null
    }
  }

  return dialog.id ? (
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
