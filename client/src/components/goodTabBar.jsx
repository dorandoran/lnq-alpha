import React, { useContext } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Icon } from 'react-native-elements'
import { Route } from '@context/routeStore'

import { theme } from '@src/theme'
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '@src/constants'

const TabIcon = ({ onPress, tabName, current, ...rest }) => {
  const color = current ? theme.color.active : theme.color.inactive
  return (
    <TouchableOpacity onPress={() => onPress(tabName)}>
      <Icon {...rest} color={color} />
    </TouchableOpacity>
  )
}

const TabBar = ({ navigationRef }) => {
  const routeState = useContext(Route.State)
  const handlePress = screen => {
    if (navigationRef.current) {
      navigationRef.current.navigate(screen)
    }
  }

  return (
    <View style={styles.container}>
      <TabIcon
        tabName="Home"
        current={routeState.name === 'Home'}
        type="ionicon"
        name="ios-home"
        onPress={handlePress}
      />
      {/* <TabIcon
        tabName="Find"
        current={route}
        type="material"
        name="search"
      /> */}
      <TabIcon
        tabName="Profile"
        current={routeState.name === 'Profile'}
        type="material-community"
        name="account"
        size={28}
        onPress={() => handlePress('Profile')}
      />
      <TabIcon
        tabName="Create"
        current={routeState.name === 'Create'}
        type="ionicon"
        name="md-add"
        onPress={() => handlePress('Create')}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    position: 'absolute',
    bottom: SCREEN_HEIGHT / 30,
    left: SCREEN_HEIGHT / 30,
    height: '6%',
    width: '70%',
    backgroundColor: 'purple',
    borderRadius: 25
  }
})

export default TabBar
