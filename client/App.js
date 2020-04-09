import React from 'react'
import { YellowBox } from 'react-native'

import { client } from '@services/apollo'
import { ApolloProvider } from '@apollo/react-hooks'

import AppProviders from '@context'
import { useUser } from '@context/userContext'

import AuthenticatedApp from '@src/router/AuthenticatedApp'
import UnAuthenticatedApp from '@src/router/UnAthenticatedApp'

import ViewContainer from '@components/viewContainer'

const AppContainer = () => {
  const user = useUser()

  return user ? 
  <AuthenticatedApp user={user} /> : 
  <UnAuthenticatedApp />
}

const App = () => {
  // TODO Find a more graceful way to handle this
  YellowBox.ignoreWarnings(['Setting a timer'])

  return (
    <ApolloProvider client={client}>
      <AppProviders>
        <ViewContainer>
          <AppContainer />
        </ViewContainer>
      </AppProviders>
    </ApolloProvider>
  )
}

export default App
