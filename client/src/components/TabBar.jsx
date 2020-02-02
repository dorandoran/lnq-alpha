import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

const TabBar = props => {
  const {
    renderIcon,
    getLabelText,
    activeTintColor,
    inactiveTintColor,
    onTabPress,
    onTabLongPress,
    getAccessibilityLabel,
    navigation
  } = props

  const { routes, index: activeRouteIndex } = navigation.state

  return (
    <View style={styles.container}>
      {routes.map((route, routeIndex) => {
        const isRouteActive = routeIndex === activeRouteIndex
        const tintColor = isRouteActive ? activeTintColor : inactiveTintColor

        return (
          <TouchableOpacity
            key={routeIndex}
            style={styles.tabButton}
            onPress={() => {
              onTabPress({ route })
            }}
            onLongPress={() => {
              onTabLongPress({ route })
            }}
            accessibilityLabel={getAccessibilityLabel({ route })}
          >
            {renderIcon({ route, focused: isRouteActive, tintColor })}

            <Text style={{ color: 'white' }}>{getLabelText({ route })}</Text>
          </TouchableOpacity>
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 52,
    elevation: 2,
    backgroundColor: '#0C1D27'
  },
  tabButton: { flex: 1, justifyContent: 'center', alignItems: 'center' }
})

export default TabBar
