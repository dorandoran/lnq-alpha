import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { AuthProvider } from '@context/authContext'
import { UserProvider } from '@context/userContext'
import { NotificationProvider } from '@context/notificationContext'
import { Store as RouteStore } from '@context/routeStore'
import { OverlayProvider } from '@context/overlayContext'

import Notification from '@components/main/notification'

const AppProviders = ({ children }) => {
  return (
    <NotificationProvider>
      <AuthProvider>
        <UserProvider>
          <RouteStore>
            <OverlayProvider>
              <Fragment>
                {children}
                <Notification />
              </Fragment>
            </OverlayProvider>
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
