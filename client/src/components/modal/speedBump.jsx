import React, { useContext } from 'react'
import NotificationContext from '@context/notificationContext'

import { View, StyleSheet } from 'react-native'
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '@util/constants'

const SpeedBump = () => {
  const { modalNotification, hideSpeedBump } = useContext(NotificationContext)

  if (!modalNotification) return null
  const { component } = modalNotification

  return component ? <View style={styles.container}>{component}</View> : null
}

const styles = StyleSheet.create({
  container: {
    height: SCREEN_HEIGHT,
    width: SCREEN_WIDTH,
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default SpeedBump
