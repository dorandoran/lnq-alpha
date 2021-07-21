import React from 'react'
import { LogBox } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import { client } from '@services/apollo'
import { ApolloProvider } from '@apollo/client'

import useAuth from '@context/authContext'
import AppProviders from '@components/main/appProviders'

import AuthenticatedApp from '@src/router/AuthenticatedApp'
import UnAuthenticatedApp from '@src/router/UnAuthenticatedApp'

import ViewContainer from '@components/main/viewContainer'

const AppContainer = () => {
  const { authState } = useAuth()

  return authState.authenticated ? <AuthenticatedApp /> : <UnAuthenticatedApp />
}

const App = () => {
  // TODO Find a more graceful way to handle this
  LogBox.ignoreLogs(['Setting a timer'])

  return (
    <ApolloProvider client={client}>
      <SafeAreaProvider>
        <AppProviders>
          <ViewContainer>
            <AppContainer />
          </ViewContainer>
        </AppProviders>
      </SafeAreaProvider>
    </ApolloProvider>
  )
}

export default App
