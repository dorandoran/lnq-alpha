import React from 'react'
import useOverlay from '@context/overlayContext'

import ResetPasswordDialog from '@components/auth/utilComponents/actionResetPassDialog'

import { DialogContainer } from '@common'

const AuthDialog = () => {
  const { dialog, actions } = useOverlay()

  if (dialog.id === actions.dialog.auth.reset) {
    return (
      <DialogContainer>
        <ResetPasswordDialog />
      </DialogContainer>
    )
  }
  return null
}

export default AuthDialog
