import React from 'react'
import { AuthProvider } from './auth-context'
import { UserProvider } from './user-context'

// eslint-disable-next-line react/prop-types
const AppProviders = ({ children }) => {
  return (
    <AuthProvider>
      <UserProvider>{children}</UserProvider>
    </AuthProvider>
  )
}

export default AppProviders