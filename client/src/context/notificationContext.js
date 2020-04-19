import React, { createContext, useState } from 'react'
import PropTypes from 'prop-types'

const NotificationContext = createContext()

const initialState = {
  component: null
}

export const NotificationProvider = ({ children }) => {
  const [modalNotification, setModalNotification] = useState(initialState)

  const showSpeedBump = component => {
    setModalNotification({ ...modalNotification, component })
  }

  const hideSpeedBump = () => {
    setModalNotification({ ...setModalNotification, component: null })
  }

  return (
    <NotificationContext.Provider
      value={{ modalNotification, showSpeedBump, hideSpeedBump }}
    >
      {children}
    </NotificationContext.Provider>
  )
}

NotificationProvider.propTypes = {
  children: PropTypes.node.isRequired
}

export default NotificationContext
