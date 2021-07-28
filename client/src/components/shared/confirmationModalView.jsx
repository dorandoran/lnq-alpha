import React from 'react'
import PropTypes from 'prop-types'

import { theme } from '@util'
import { StyleSheet, View, Text } from 'react-native'
import { DialogConfirmActions } from '@common'

const ConfirmationModalView = ({ message, handleClose, handleConfirm }) => {
  return (
    <View style={styles.container}>
      <View style={styles.messageContainer}>
        <Text style={styles.message}>{message}</Text>
      </View>
      <DialogConfirmActions
        handleClose={handleClose}
        handleConfirm={handleConfirm}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    alignItems: 'center',
    width: '90%',
    backgroundColor: theme.color.accent,
    borderRadius: 25,
    paddingHorizontal: '3%'
  },
  messageContainer: {
    padding: '5%'
  },
  message: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.color.tertiary
  }
})

ConfirmationModalView.propTypes = {
  message: PropTypes.string.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleConfirm: PropTypes.func.isRequired
}

export default ConfirmationModalView
