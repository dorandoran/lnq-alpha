import React from 'react'

import { theme } from '@src/theme'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { Icon } from 'react-native-elements'
import { SCREEN_HEIGHT } from '@util/constants'

const EventFooter = () => {
  return (
    <TouchableOpacity onPress={() => {}} style={styles.iconContainer}>
      <Icon
        type='material-community'
        name='chevron-up'
        color={theme.color.tertiary}
        size={30}
      />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  iconContainer: {
    position: 'absolute',
    bottom: SCREEN_HEIGHT + 15,
    right: 20,
    height: 35,
    width: 35,
    justifyContent: 'center',
    backgroundColor: theme.color.accent,
    borderRadius: 25
  }
})

export default EventFooter
