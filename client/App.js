import React from "react"
import { SafeAreaView, StyleSheet, Platform } from "react-native"
import Constants from "expo-constants"
import { theme } from "@src/theme"
import { ThemeProvider } from "react-native-elements"
import ignoreWarnings from "react-native-ignore-warnings"

import AppProviders from "@context"
import { useUser } from "@context/userContext"
import AuthenticatedApp from "@src/router/AuthenticatedApp"
import UnAuthenticatedApp from "@src/router/UnAthenticatedApp"

const AppContainer = () => {
  const user = useUser()

  return user ? <AuthenticatedApp /> : <UnAuthenticatedApp />
}

const App = () => {
  // TODO: Investigate firebase-android timer issue.
  ignoreWarnings("Setting a timer")

  return (
    <ThemeProvider theme={theme}>
      <AppProviders>
        <SafeAreaView style={styles.safeView}>
          <AppContainer />
        </SafeAreaView>
      </AppProviders>
    </ThemeProvider>
  )
}

const styles = StyleSheet.create({
  safeView: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? Constants.statusBarHeight : 0,
    backgroundColor: theme.color.primary
  }
})

export default App
