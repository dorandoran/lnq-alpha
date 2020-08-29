import React, { createContext, useContext, useReducer } from 'react'
import PropTypes from 'prop-types'

import { SCREEN } from '@components/profile/utilComponents/profileUtil'

// Reducer
export const actions = {
  navigateMain: 'navigateMain',
  navigateNotifications: 'navigateNotifications'
}

const initialState = {
  screen: SCREEN.MAIN
}

function reducer(state, action) {
  switch (action.type) {
    case actions.navigateMain: {
      return {
        ...state,
        screen: SCREEN.MAIN
      }
    }
    case actions.navigateNotifications: {
      return {
        ...state,
        screen: SCREEN.NOTIFICATIONS
      }
    }
    default:
      // TODO: Error handling
      throw new Error('Issue in profileContext.js')
  }
}

// Context
const ProfileContext = createContext()

export const ProfileProvider = ({ children }) => {
  const [profileState, dispatch] = useReducer(reducer, initialState)

  return (
    <ProfileContext.Provider value={{ profileState, dispatch }}>
      {children}
    </ProfileContext.Provider>
  )
}

const useProfile = () => {
  const context = useContext(ProfileContext)
  if (context === undefined) {
    throw new Error('useSearch must be used within a ProfileProvider')
  }
  return context
}

ProfileProvider.propTypes = {
  children: PropTypes.node
}

export default useProfile
