import React from 'react'
import { theme } from '@src/theme'
import { ThemeProvider } from 'react-native-elements'

import AppProviders from '@context'
import { useUser } from '@context/user-context'

import AuthenticatedApp from './AuthenticatedApp'
import UnAuthenticatedApp from './UnAthenticatedApp'

// Services
import { initializeFirebase } from '@services/firebase'

const AppContainer = () => {
  const user = useUser()

  return user ? <AuthenticatedApp/> : <UnAuthenticatedApp/>
}

const App = () => {
  initializeFirebase()

  return (
    <ThemeProvider theme={theme}>
      <AppProviders>
        <AppContainer />
      </AppProviders>
    </ThemeProvider>
  )
}

export default App
