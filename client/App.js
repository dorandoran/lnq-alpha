import React from 'react'
import { YellowBox } from 'react-native'
import { ApolloProvider } from '@apollo/react-hooks'
import { client } from '@services/apollo'

import { theme } from '@src/theme'
import { ThemeProvider } from 'react-native-elements'

import AppProviders from '@context'
import { useUser } from '@context/userContext'

import AuthenticatedApp from './AuthenticatedApp'
import UnAuthenticatedApp from './UnAthenticatedApp'

const AppContainer = () => {
  const user = useUser()

  return user ? <AuthenticatedApp /> : <UnAuthenticatedApp />
}

const App = () => {
  YellowBox.ignoreWarnings(['Setting a timer'])
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <AppProviders>
          <AppContainer />
        </AppProviders>
      </ThemeProvider>
    </ApolloProvider>
  )
}

export default App
