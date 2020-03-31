import React from 'react'
import { View, ActivityIndicator, StyleSheet } from 'react-native'
import { theme } from '@src/theme'

const Loading = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={theme.color.secondary} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.color.background,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default Loading
