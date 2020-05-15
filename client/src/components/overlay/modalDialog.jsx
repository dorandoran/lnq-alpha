import React from 'react'
import useOverlay from '@context/overlayContext'

import AddMediaDialog from '@components/event/utilComponents/actionAddMediaDialog'
import DeleteMedia from '@components/event/utilComponents/actionDeleteMediaDialog'
import ChangeAvatar from '@components/event/utilComponents/actionChangeAvatarDialog'
import UpdateEvent from '@components/event/utilComponents/actionUpdateEventDialog'
import DeleteEvent from '@components/event/utilComponents/actionDeleteEventDialog'

import { View, StyleSheet, KeyboardAvoidingView } from 'react-native'
import { theme, SCREEN_HEIGHT, SCREEN_WIDTH } from '@util'

import { DialogContainer } from '@common'

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
  if (!dialog.id) return null
  return <DialogContainer>{renderDialog()}</DialogContainer>
}

export default EventDialog
