import React, { createContext, useState } from 'react'
import PropTypes from 'prop-types'

const DialogContext = createContext()

const initialState = {
  id: null,
  dialog: null
}

export const DialogProvider = ({ children }) => {
  const [modalDialog, setModalDialog] = useState(initialState)

  const openDialog = info => {
    setModalDialog(info)
  }

  const closeModalDialog = () => {
    setModalDialog(initialState)
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
