import React from 'react'
import { SafeAreaView, StyleSheet, Platform, YellowBox } from 'react-native'
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

  return user ? <AuthenticatedApp /> : <UnAuthenticatedApp />
}

const App = () => {
  YellowBox.ignoreWarnings(['Setting a timer'])

  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <AppProviders>
          <SafeAreaView style={styles.safeView}>
            <AppContainer />
          </SafeAreaView>
        </AppProviders>
      </ThemeProvider>
    </ApolloProvider>
  )
}

const styles = StyleSheet.create({
  safeView: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? Constants.statusBarHeight : 0,
    backgroundColor: theme.color.background
  }
})

export default App
