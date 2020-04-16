import React from 'react'

import { theme } from '@src/theme'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { Icon } from 'react-native-elements'
import { Header } from '@common'

const EventFooter = () => {
  return (
    <Header position="relative">
      <View />
      <View />
      <TouchableOpacity onPress={() => {}} style={styles.iconContainer}>
        <Icon type="ionicon" name="ios-arrow-up" color={theme.color.tertiary} />
      </TouchableOpacity>
    </Header>
  )
}

const styles = StyleSheet.create({
  iconContainer: {
    backgroundColor: theme.color.accent,
    aspectRatio: 1,
    padding: '2%',
    borderRadius: 25
  }
})

export default EventFooter
