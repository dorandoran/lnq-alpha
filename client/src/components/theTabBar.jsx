import React, { useContext } from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { Icon } from 'react-native-elements'
import { Route } from '@context/routeStore'

import { theme } from '@src/theme'
import { SCREEN_HEIGHT } from '@src/constants'

const TabIcon = ({ onPress, tabName, color, ...rest }) => {
  const routeState = useContext(Route.State)
  const iconColor = color || theme.color.tertiary
  const focusedStyle =
    routeState?.name === tabName
      ? {
          backgroundColor: theme.color.active
        }
      : null

  return (
    <TouchableOpacity
      style={[styles.iconContainer, focusedStyle]}
      onPress={() => onPress(tabName)}
    >
      <Icon {...rest} color={iconColor} />
    </TouchableOpacity>
  )
}

const TabBar = ({ mainFlowRef }) => {
  const routeState = useContext(Route.State)

  const handlePress = screen => {
    mainFlowRef?.current.navigate(screen)
  }

  // Turns off tab bar
  // Useful for things like <CreateScreen />
  if (routeState.tabBar) return null

  return (
    <View style={styles.container}>
      <View style={styles.tabContainer}>
        <TabIcon
          tabName="Home"
          type="ionicon"
          name="ios-home"
          onPress={handlePress}
        />
        <TabIcon
          tabName="Search"
          type="material"
          name="search"
          size={28}
          onPress={handlePress}
        />
        <TabIcon
          tabName="Locate"
          type="ionicon"
          name="md-pin"
          onPress={handlePress}
        />
        <TabIcon
          tabName="Profile"
          type="material-community"
          name="account"
          size={28}
          onPress={() => handlePress('Profile')}
        />
      </View>
      <View style={styles.createContainer}>
        <TabIcon
          tabName="Create"
          type="ionicon"
          name="md-add"
          color={theme.color.secondary}
          reverse
          onPress={() => handlePress('Create')}
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
    bottom: SCREEN_HEIGHT / 30,
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
  createContainer: {
    width: '26%',
    alignItems: 'center',
    marginRight: SCREEN_HEIGHT / 30
  },
  iconContainer: {
    height: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    aspectRatio: 1,
    borderRadius: 25,
    padding: 1
  }
})

export default TabBar
