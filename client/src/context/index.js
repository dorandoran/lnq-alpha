import React from 'react'
import PropTypes from 'prop-types'
import { AuthProvider } from '@context/authContext'
import { UserProvider } from '@context/userContext'
import { Store as RouteStore } from '@context/routeStore'

const AppProviders = ({ children }) => {
  return (
    <AuthProvider>
      <UserProvider>
        <RouteStore>{children}</RouteStore>
      </UserProvider>
    </AuthProvider>
  )
}

AppProviders.propTypes = {
  children: PropTypes.node
}

export default AppProviders
