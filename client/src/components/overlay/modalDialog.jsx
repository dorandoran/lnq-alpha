import React from 'react'
import PropTypes from 'prop-types'
import useOverlay from '@context/overlayContext'

import AddMediaDialog from '@components/event/utilComponents/actionAddMediaDialog'
import DeleteMedia from '@components/event/utilComponents/actionDeleteMediaDialog'
import ChangeAvatar from '@components/event/utilComponents/actionChangeAvatarDialog'
import UpdateEvent from '@components/event/utilComponents/actionUpdateEventDialog'
import DeleteEvent from '@components/event/utilComponents/actionDeleteEventDialog'

import { View, StyleSheet, KeyboardAvoidingView } from 'react-native'
import { theme, SCREEN_HEIGHT, SCREEN_WIDTH } from '@util'

const EventDialog = () => {
  const { dialog, actions } = useOverlay()
  const renderDialog = () => {
    switch (dialog.id) {
      // Event Dialogs
      case actions.dialog.events.addMedia:
        return <AddMediaDialog />
      case actions.dialog.events.deleteMedia:
        return <DeleteMedia />
      case actions.dialog.events.changeAvatar:
        return <ChangeAvatar />
      case actions.dialog.events.update:
        return <UpdateEvent />
      case actions.dialog.events.delete:
        return <DeleteEvent />
      default:
        return null
    }
  }

  return dialog.id ? (
    <View style={styles.container}>
      <KeyboardAvoidingView behavior='height' style={styles.awareView}>
        <View style={styles.dialogContainer}>{renderDialog()}</View>
      </KeyboardAvoidingView>
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
    padding: 5
  },
  awareView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  dialogContainer: {
    backgroundColor: theme.color.accent,
    borderRadius: 25,
    alignItems: 'center',
    paddingHorizontal: '3%',
    borderWidth: 2,
    borderColor: theme.color.backgroundColor
  }
})

EventDialog.propTypes = {
  onClose: PropTypes.func
}

export default EventDialog
