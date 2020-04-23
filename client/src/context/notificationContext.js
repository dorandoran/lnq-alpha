import React, { createContext, useReducer } from 'react'
import PropTypes from 'prop-types'

const NotificationContext = createContext()

// Notification
const initialNotificationState = {
  message: null,
  type: null,
  open: false,
  loading: true
}

function notificationReducer (state, action) {
  switch (action.type) {
    case 'success':
      return {
        message: action.payload.message,
        type: 'success',
        open: true,
        loading: false
      }
    case 'error':
      return {
        message: action.payload.message,
        type: 'error',
        open: true,
        loading: false
      }
    case 'warning':
      return {
        message: action.payload.message,
        type: 'warning',
        open: true,
        loading: false
      }
    case 'notification':
      return {
        message: action.payload.message,
        type: action.payload.type,
        open: true,
        loading: false
      }
    case 'loading':
      return {
        ...state,
        loading: true
      }
    case 'closeNotification':
      return { ...state, open: false }
    default:
      // TODO: Error handling
      throw new Error()
  }
}

export const NotificationProvider = ({ children }) => {
  const [notificationState, notificationDispatch] = useReducer(
    notificationReducer,
    initialNotificationState
  )

  return (
    <NotificationContext.Provider
      value={{
        notificationState,
        notificationDispatch
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
