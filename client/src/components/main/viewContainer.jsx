import React from 'react'
import PropTypes from 'prop-types'
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
    backgroundColor: theme.color.background
  }
})

ViewContainer.propTypes = {
  children: PropTypes.node
}

export default ViewContainer
