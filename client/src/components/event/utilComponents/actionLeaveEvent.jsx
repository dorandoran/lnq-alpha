import React from 'react'

import { theme } from '@src/theme'
import { TouchableOpacity, StyleSheet } from 'react-native'
import { Icon } from 'react-native-elements'

const ActionLeaveEvent = () => {
  return (
    <TouchableOpacity style={styles.container}>
      <Icon
        type='material-community'
        name='exit-to-app'
        color={theme.color.tertiary}
      />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 25,
    aspectRatio: 1,
    justifyContent: 'center'
  }
})

export default ActionLeaveEvent
