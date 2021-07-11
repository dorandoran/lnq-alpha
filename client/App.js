import React from 'react'
import { LogBox } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import { client } from '@services/apollo'
import { ApolloProvider } from '@apollo/client'

import useUser from '@context/userContext'
import AppProviders from '@components/main/appProviders'

import AuthenticatedApp from '@src/router/AuthenticatedApp'
import UnAuthenticatedApp from '@src/router/UnAuthenticatedApp'

import ViewContainer from '@components/main/viewContainer'

const AppContainer = () => {
  const user = useUser()

  return user ? <AuthenticatedApp user={user} /> : <UnAuthenticatedApp />
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
