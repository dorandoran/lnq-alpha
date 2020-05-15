import React from 'react'
import useOverlay from '@context/overlayContext'

import AddMediaDialog from '@components/event/utilComponents/actionAddMediaDialog'
import DeleteMedia from '@components/event/utilComponents/actionDeleteMediaDialog'
import ChangeAvatar from '@components/event/utilComponents/actionChangeAvatarDialog'
import UpdateEvent from '@components/event/utilComponents/actionUpdateEventDialog'

import { DialogContainer } from '@common'

const EventDialog = () => {
  const { dialog, actions } = useOverlay()

  const renderDialog = () => {
    switch (dialog.id) {
      case actions.dialog.events.addMedia:
        return <AddMediaDialog />
      case actions.dialog.events.deleteMedia:
        return <DeleteMedia />
      case actions.dialog.events.changeAvatar:
        return <ChangeAvatar />
      case actions.dialog.events.updateEvent:
        return <UpdateEvent />
      default:
        return null
    }
  }
  if (!dialog.id) return null
  return <DialogContainer>{renderDialog()}</DialogContainer>
}

export default EventDialog
