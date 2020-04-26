import React, { createContext, useContext } from 'react'
import useAuth from '@context/authContext'

const UserContext = createContext()

const UserProvider = props => {
  const { authState } = useAuth()
  return <UserContext.Provider value={authState.user} {...props} />
}

const useUser = () => {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider')
  }

  return context
}

export { UserProvider, useUser, UserContext }
