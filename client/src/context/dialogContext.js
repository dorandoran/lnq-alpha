import React, { createContext, useContext, useState } from 'react'
import PropTypes from 'prop-types'

const DialogContext = createContext()

export const actions = {
  openAddMedia: 'openAddMedia',
  openDeleteMedia: 'openDeleteMedia'
}

const initialState = {
  temp: {},
  dialog: null
}

export const DialogProvider = ({ children }) => {
  const [dialogState, setDialog] = useState(initialState)

  const openDialog = ({ dialog, temp }) => {
    setDialog({ dialog, temp: { ...dialogState.temp, ...temp } })
  }

  const closeDialog = ({ temp }) => {
    setDialog({ dialog: null, temp: { ...dialogState.temp, ...temp } })
  }

  const updateTemp = data => {
    setDialog({ ...dialogState, temp: { ...dialogState.temp, ...data } })
  }

  const resetDialog = () => {
    setDialog(initialState)
  }

  return (
    <DialogContext.Provider
      value={{
        openDialog,
        closeDialog,
        updateTemp,
        resetDialog,
        temp: dialogState.temp,
        dialog: dialogState.dialog
      }}
    >
      {children}
    </DialogContext.Provider>
  )
}

const useDialog = () => {
  const context = useContext(DialogContext)
  if (context === undefined) {
    throw new Error('useDialog must be used within a DialogProvider')
  }
  return context
}

DialogProvider.propTypes = {
  children: PropTypes.node.isRequired
}

export default useDialog
