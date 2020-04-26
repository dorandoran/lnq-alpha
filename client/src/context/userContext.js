import React, { createContext, useContext } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { GetUser } from '@graphql/user/queries'
import useAuth from '@context/authContext'

const UserContext = createContext()

const UserProvider = props => {
  const { authState } = useAuth()

  // Cache user
  useQuery(GetUser, {
    variables: { id: authState.user },
    skip: !authState.user
  })

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
