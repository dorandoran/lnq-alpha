import React from 'react'
import { View, StyleSheet, YellowBox } from 'react-native'
import Constants from 'expo-constants'

import { client } from '@services/apollo'
import { ApolloProvider } from '@apollo/react-hooks'

import { theme } from '@src/theme'
import { ThemeProvider } from 'react-native-elements'

import AppProviders from '@context'
import { useUser } from '@context/userContext'
import AuthenticatedApp from '@src/router/AuthenticatedApp'
import UnAuthenticatedApp from '@src/router/UnAthenticatedApp'

const AppContainer = () => {
  const user = useUser()

  return user ? <AuthenticatedApp user={user} /> : <UnAuthenticatedApp />
}

const App = () => {
  // TODO Find a more graceful way to handle this
  YellowBox.ignoreWarnings(['Setting a timer'])

  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <AppProviders>
          <View style={styles.container}>
            <AppContainer />
          </View>
        </AppProviders>
      </ThemeProvider>
    </ApolloProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.color.primary
  }
})

export default App
