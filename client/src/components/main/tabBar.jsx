import React from 'react'
import { useRouteState } from '@hooks/useRoute'
import PropTypes from 'prop-types'

import { View, StyleSheet, TouchableOpacity, StatusBar } from 'react-native'
import { Icon } from 'react-native-elements'

import { theme, navigate, SCREEN_HEIGHT } from '@util'

const TabIcon = ({ onPress, tabName, color, ...rest }) => {
  const { name } = useRouteState()
  const iconColor =
    color || tabName === name ? theme.color.accent : theme.color.tertiary
  return (
    <TouchableOpacity
      style={styles.iconContainer}
      onPress={() => onPress(tabName)}
    >
      <Icon {...rest} color={iconColor} />
    </TouchableOpacity>
  )
}

const TabBar = () => {
  const { tabBar } = useRouteState()
  const { show } = tabBar

  const handlePress = screen => {
    navigate(screen)
  }

  // Turns off tab bar
  // Useful for things like <CreateScreen />
  if (!show) return null

  return (
    <View style={styles.container}>
      <View style={styles.tabContainer}>
        <TabIcon
          tabName='Home'
          type='ionicon'
          name='ios-home'
          onPress={handlePress}
        />
        <TabIcon
          tabName='Search'
          type='material'
          name='search'
          size={28}
          onPress={handlePress}
        />
        <TabIcon
          tabName='Locate'
          type='ionicon'
          name='md-pin'
          onPress={handlePress}
        />
        <TabIcon
          tabName='Profile'
          type='material-community'
          name='account'
          size={28}
          onPress={handlePress}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    bottom: SCREEN_HEIGHT / 15 - StatusBar.currentHeight,
    left: SCREEN_HEIGHT / 30,
    height: '6%',
    width: '100%'
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: '100%',
    width: '65%',
    backgroundColor: theme.color.primary,
    borderRadius: 25
  },
  iconContainer: {
    height: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 1,
    aspectRatio: 1,
    borderRadius: 25
  }
})

TabIcon.propTypes = {
  onPress: PropTypes.func.isRequired,
  tabName: PropTypes.string.isRequired,
  color: PropTypes.string
}

TabBar.propTypes = {
  mainFlowRef: PropTypes.object
}

export default TabBar
