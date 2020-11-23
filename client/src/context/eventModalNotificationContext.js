import React, { createContext, useReducer } from 'react'
import PropTypes from 'prop-types'
import { initialState, reducer } from '@context/notificationContext'

const ModalNotificationContext = createContext()

export const ModalNotificationProvider = ({ children }) => {
  const [state, dispatch] = useReducer(
    reducer,
    initialState
  )

  return (
    <ModalNotificationContext.Provider
      value={{
        state,
        dispatch
      }}
    >
      {children}
    </ModalNotificationContext.Provider>
  )
}

ModalNotificationProvider.propTypes = {
  children: PropTypes.node.isRequired
}

export default ModalNotificationContext
