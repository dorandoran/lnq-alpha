import React from 'react'

import { theme } from '@src/theme'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { Icon } from 'react-native-elements'
import { Header } from '@common'

const EventFooter = () => {
  return (
    <Header position='relative'>
      <View />
      <View />
      <TouchableOpacity onPress={() => {}} style={styles.iconContainer}>
        <Icon
          type='material-community'
          name='chevron-up'
          color={theme.color.tertiary}
          size={30}
        />
      </TouchableOpacity>
    </Header>
  )
}

const styles = StyleSheet.create({
  iconContainer: {
    backgroundColor: theme.color.accent,
    padding: '2%',
    width: 35,
    height: 35,
    borderRadius: 25,
    justifyContent: 'center'
  }
})

export default EventFooter
