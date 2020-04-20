import React, { Fragment, useContext } from 'react'
import { Route } from '@context/routeStore'

import { theme } from '@src/theme'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { Icon } from 'react-native-elements'

const EventHeader = () => {
  const dispatch = useContext(Route.Dispatch)
  return (
    <Fragment>
      <TouchableOpacity
        onPress={() => dispatch({ type: 'closeModal' })}
        style={[styles.iconContainer, styles.button, styles.backButton]}
      >
        <Icon
          type='material'
          name='chevron-left'
          size={30}
          color={theme.color.tertiary}
        />
      </TouchableOpacity>
      <View />
      <TouchableOpacity
        onPress={() => {}}
        style={[styles.iconContainer, styles.button, styles.actionButton]}
      >
        <Icon
          type='material-community'
          name='menu'
          color={theme.color.tertiary}
        />
      </TouchableOpacity>
    </Fragment>
  )
}

const styles = StyleSheet.create({
  backButton: {
    left: 20
  },
  actionButton: {
    right: 20
  },
  button: {
    height: 35,
    justifyContent: 'center'
  },
  iconContainer: {
    position: 'absolute',
    top: 20,
    width: 35,
    backgroundColor: theme.color.accent,
    borderRadius: 25
  }
})

export default EventHeader
