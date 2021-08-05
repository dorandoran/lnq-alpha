import React, { Suspense } from 'react'
import { LogBox } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import { client } from '@services/apollo'
import { ApolloProvider } from '@apollo/client'

import useAuth from '@context/authContext'
import AppProviders from '@components/main/appProviders'
import ViewContainer from '@components/main/viewContainer'
import { Loading } from '@common'

const AuthenticatedApp = React.lazy(() => import('@src/router/AuthenticatedApp'))
const UnAuthenticatedApp = React.lazy(() => import('@src/router/UnAuthenticatedApp'))

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
            <Suspense fallback={<Loading fullscreen />}>
              <AppContainer />
            </Suspense>
          </ViewContainer>
        </AppProviders>
      </SafeAreaProvider>
    </ApolloProvider>
  )
}

export default App
