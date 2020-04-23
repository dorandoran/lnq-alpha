import React from 'react'
import PropTypes from 'prop-types'
import { AuthProvider } from '@context/authContext'
import { UserProvider } from '@context/userContext'
import { NotificationProvider } from '@context/notificationContext'
import { Store as RouteStore } from '@context/routeStore'

import { View } from 'react-native'
import Notification from '@components/main/notification'

const AppProviders = ({ children }) => {
  return (
    <NotificationProvider>
      <AuthProvider>
        <UserProvider>
          <RouteStore>
            <View style={{ flex: 1 }}>
              {children}
              <Notification />
            </View>
          </RouteStore>
        </UserProvider>
      </AuthProvider>
    </NotificationProvider>
  )
}

AppProviders.propTypes = {
  children: PropTypes.node
}

export default AppProviders
