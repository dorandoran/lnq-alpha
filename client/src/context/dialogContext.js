import React, { createContext, useState } from 'react'
import PropTypes from 'prop-types'

const DialogContext = createContext()

const initialModalDialogState = {
  id: null,
  dialog: null
}

export const DialogProvider = ({ children }) => {
  const [modalDialog, setModalDialog] = useState(initialModalDialogState)

  const openDialog = info => {
    setModalDialog(info)
  }

  const closeModalDialog = () => {
    setModalDialog(initialModalDialogState)
  }

  return (
    <DialogContext.Provider
      value={{
        openDialog,
        closeModalDialog,
        modalDialog
      }}
    >
      {children}
    </DialogContext.Provider>
  )
}

DialogProvider.propTypes = {
  children: PropTypes.node.isRequired
}

export default DialogContext
