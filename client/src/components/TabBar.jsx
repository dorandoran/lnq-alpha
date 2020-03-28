import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

const TabBar = ({ state, descriptors, navigation }) => {
  return (
    <View style={styles.container}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key]
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name

        const isFocused = state.index === index

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true
          })

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name)
          }
        }

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key
          })
        }

        const tintColor = isFocused ? '#dddd27' : '#d8d8d8'

        return (
          <TouchableOpacity
            key={index}
            style={styles.tabButton}
            accessibilityRole="button"
            accessibilityStates={isFocused ? ['selected'] : []}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
          >
            {options.tabBarIcon({
              focused: isFocused,
              tintColor: tintColor,
              size: 10
            })}
            <Text style={{ color: tintColor }}>{label}</Text>
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
  tabButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default TabBar
