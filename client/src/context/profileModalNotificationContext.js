import React, { createContext, useReducer } from 'react'
import PropTypes from 'prop-types'
import { initialState, reducer } from '@context/notificationContext'

const ProfileModalNotificationContext = createContext()

export const ProfileModalNotificationProvider = ({ children }) => {
  const [state, dispatch] = useReducer(
    reducer,
    initialState
  )

  return (
    <ProfileModalNotificationContext.Provider
      value={{
        state,
        dispatch
      }}
    >
      {children}
    </ProfileModalNotificationContext.Provider>
  )
}

ProfileModalNotificationProvider.propTypes = {
  children: PropTypes.node.isRequired
}

export default ProfileModalNotificationContext
