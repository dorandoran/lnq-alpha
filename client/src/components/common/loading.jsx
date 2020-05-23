import React from 'react'
import PropTypes from 'prop-types'
import { View, ActivityIndicator, StyleSheet } from 'react-native'
import { theme } from '@util'
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '@util'

const Loading = ({ styleProps, fullScreen, position, size = 'large' }) => {
  return (
    <View
      style={[
        styles.container,
        styleProps,
        fullScreen ? styles.fullScreen : null,
        position === 'top' ? styles.top : null
      ]}
    >
      <ActivityIndicator size={size} color={theme.color.secondary} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%'
  },
  fullScreen: {
    height: SCREEN_HEIGHT,
    width: SCREEN_WIDTH
  },
  top: {
    justifyContent: 'flex-start',
    marginTop: 75
  }
})

Loading.propTypes = {
  styleProps: PropTypes.object,
  size: PropTypes.string,
  fullScreen: PropTypes.bool,
  position: PropTypes.string
}

export default Loading
