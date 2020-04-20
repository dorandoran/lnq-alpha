import React, { useContext } from 'react'
import { Route } from '@context/routeStore'

import { theme } from '@src/theme'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { Icon } from 'react-native-elements'
import { Header } from '@common'

const EventHeader = () => {
  const dispatch = useContext(Route.Dispatch)
  return (
    <Header position="relative">
      <TouchableOpacity
        onPress={() => dispatch({ type: 'closeModal' })}
        style={styles.iconContainer}
      >
        <Icon
          type="ionicon"
          name="ios-arrow-back"
          color={theme.color.tertiary}
        />
      </TouchableOpacity>
      <View />
      <TouchableOpacity onPress={() => {}} style={styles.iconContainer}>
        <Icon
          type="material-community"
          name="menu"
          color={theme.color.tertiary}
        />
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

export default EventHeader
