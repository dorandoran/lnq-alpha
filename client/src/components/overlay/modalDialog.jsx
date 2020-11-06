import React from 'react'
import useOverlay from '@context/overlayContext'

import DeleteEvent from '@components/event/utilComponents/actionDeleteEventDialog'

import { DialogContainer } from '@common'

const EventDialog = () => {
  const { dialog, actions } = useOverlay()
  const renderDialog = () => {
    switch (dialog.id) {
      // Event Dialogs
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
