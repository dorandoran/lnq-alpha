import React from 'react'

import { theme } from '@util'
import { View, StyleSheet } from 'react-native'

const HomeScreen = () => {
  return <View style={styles.container}></View>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.color.background
  }
})

HomeScreen.propTypes = {}

export default HomeScreen
