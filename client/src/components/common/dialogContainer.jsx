import React from 'react'
import PropTypes from 'prop-types'

import { theme } from '@util'
import { View, StyleSheet, KeyboardAvoidingView } from 'react-native'
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '@util'

const DialogContainer = ({ children }) => {
  return (
    <View style={styles.container}>
      <KeyboardAvoidingView behavior='height' style={styles.awareView}>
        <View style={styles.dialogContainer}>{children}</View>
      </KeyboardAvoidingView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: SCREEN_HEIGHT,
    width: SCREEN_WIDTH,
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 5
  },
  awareView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  dialogContainer: {
    width: '90%',
    backgroundColor: theme.color.accent,
    borderRadius: 25,
    alignItems: 'center',
    paddingHorizontal: '3%',
    borderWidth: 2,
    borderColor: theme.color.backgroundColor
  }
})

DialogContainer.propTypes = {
  children: PropTypes.node
}

export default DialogContainer
