import React, { createContext, useState } from 'react'
import PropTypes from 'prop-types'

const NotificationContext = createContext()

const initialState = {
  id: null,
  dialog: null
}

export const NotificationProvider = ({ children }) => {
  const [modalDialog, setModalDialog] = useState(initialState)

  const openDialog = info => {
    setModalDialog(info)
  }

  const closeModalDialog = () => {
    setModalDialog(initialState)
  }

  return (
    <NotificationContext.Provider
      value={{
        openDialog,
        closeModalDialog,
        modalDialog
      }}
    >
      {children}
    </NotificationContext.Provider>
  )
}

NotificationProvider.propTypes = {
  children: PropTypes.node.isRequired
}

export default NotificationContext
