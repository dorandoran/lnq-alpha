import React from 'react'
import PropTypes from 'prop-types'
import { View, ActivityIndicator, StyleSheet } from 'react-native'
import { theme } from '@util'

const Loading = ({ styleProps }) => {
  return (
    <View style={[styles.container, styleProps]}>
      <ActivityIndicator size='large' color={theme.color.secondary} />
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
  }
})

Loading.propTypes = {
  styleProps: PropTypes.object
}

export default Loading
