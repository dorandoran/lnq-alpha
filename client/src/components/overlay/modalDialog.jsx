import React from 'react'
import useOverlay from '@context/overlayContext'

import UpdateEvent from '@components/event/utilComponents/actionUpdateEventDialog'
import DeleteEvent from '@components/event/utilComponents/actionDeleteEventDialog'

import { DialogContainer } from '@common'

const EventDialog = () => {
  const { dialog, actions } = useOverlay()
  const renderDialog = () => {
    switch (dialog.id) {
      // Event Dialogs
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
