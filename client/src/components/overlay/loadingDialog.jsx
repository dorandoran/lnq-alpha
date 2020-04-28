import React from 'react'

import { theme } from '@src/theme'
import { View, ActivityIndicator, StyleSheet } from 'react-native'

const LoadingDialog = () => {
  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size='large' color={theme.color.secondary} />
    </View>
  )
}

const styles = StyleSheet.create({
  loadingContainer: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.color.accent,
    borderRadius: 25
  }
})

export default LoadingDialog
