import React, { createContext, useContext } from 'react'
import { useAuth } from '@context/authContext'

const UserContext = createContext()

const UserProvider = props => {
  const { token } = useAuth()
  return <UserContext.Provider value={token} {...props} />
}

const useUser = () => {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider')
  }

  return context
}

export { UserProvider, useUser, UserContext }
