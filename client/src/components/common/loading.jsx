import React from 'react'
import PropTypes from 'prop-types'
import { View, ActivityIndicator, StyleSheet } from 'react-native'
import { theme } from '@util'
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '@util/constants'

const Loading = ({ styleProps, size = 'large', fullScreen }) => {
  return (
    <View
      style={[
        styles.container,
        styleProps,
        fullScreen ? styles.fullScreen : null
      ]}
    >
      <ActivityIndicator size={size} color={theme.color.secondary} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.color.background,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%'
  },
  fullScreen: {
    height: SCREEN_HEIGHT,
    width: SCREEN_WIDTH
  }
})

Loading.propTypes = {
  styleProps: PropTypes.object,
  size: PropTypes.string,
  fullScreen: PropTypes.bool
}

export default Loading
