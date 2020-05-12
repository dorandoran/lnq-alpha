import React, { createContext, useContext, useEffect } from 'react'
import useAuth from '@context/authContext'
import useNotification from '@hooks/useNotification'

const UserContext = createContext()

export const UserProvider = props => {
  const { data } = useAuth()
  const { throwSuccess } = useNotification()
  const user = data?.user || null

  useEffect(() => {
    if (user) {
      throwSuccess('Successfully logged in.')
    }
  }, [user])

  return <UserContext.Provider value={user} {...props} />
}

const useUser = () => {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider')
  }

  return context
}

export default useUser
