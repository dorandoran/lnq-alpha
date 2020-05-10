import React from 'react'
import { useRouteState } from '@hooks/useRoute'
import PropTypes from 'prop-types'

import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { Icon } from 'react-native-elements'
import Fab from '@components/main/tabBarFab'

import { theme, navigate } from '@util'
import { SCREEN_HEIGHT } from '@util/constants'

const TabIcon = ({ onPress, tabName, color, route, ...rest }) => {
  const iconColor =
    color || tabName === route ? theme.color.accent : theme.color.tertiary

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
  const { name, tabBar } = useRouteState()
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
          route={name}
        />
        <TabIcon
          tabName='Search'
          type='material'
          name='search'
          size={28}
          onPress={handlePress}
          route={name}
        />
        <TabIcon
          tabName='Locate'
          type='ionicon'
          name='md-pin'
          onPress={handlePress}
          route={name}
        />
        <TabIcon
          tabName='Profile'
          type='material-community'
          name='account'
          size={28}
          onPress={handlePress}
          route={name}
        />
      </View>
      <View style={styles.createContainer}>
        <Fab />
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
    alignItems: 'center'
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
  color: PropTypes.string,
  route: PropTypes.string
}

TabBar.propTypes = {
  mainFlowRef: PropTypes.object
}

export default TabBar
