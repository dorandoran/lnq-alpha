import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, StatusBar } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { theme } from '@util'

const ViewContainer = ({ children }) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle='light-content' />
      {children}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.color.background
  }
})

ViewContainer.propTypes = {
  children: PropTypes.node
}

export default ViewContainer
