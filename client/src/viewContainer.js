import React from 'react'
import { View, StyleSheet, StatusBar } from 'react-native'
import Constants from 'expo-constants'
import { theme } from '@src/theme'

const ViewContainer = ({ children }) => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.color.primary
  }
})

export default ViewContainer
