import React from 'react'
import { SafeAreaView, StyleSheet, Platform, YellowBox } from 'react-native'
import Constants from 'expo-constants'
import { theme } from '@src/theme'
import { ThemeProvider } from 'react-native-elements'

import AppProviders from '@context'
import { useUser } from '@context/userContext'
import AuthenticatedApp from '@src/router/AuthenticatedApp'
import UnAuthenticatedApp from '@src/router/UnAthenticatedApp'

const AppContainer = () => {
  const user = useUser()

  return user ? <AuthenticatedApp /> : <UnAuthenticatedApp />
}

const App = () => {
  // TODO: Investigate firebase-android timer issue.
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

const styles = StyleSheet.create({
  safeView: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? Constants.statusBarHeight : 0,
    backgroundColor: theme.color.primary
  }
})

export default App
