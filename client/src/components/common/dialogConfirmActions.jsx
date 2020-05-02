import React from 'react'
import PropTypes from 'prop-types'

import { View, TouchableOpacity, StyleSheet } from 'react-native'
import { Icon } from 'react-native-elements'
import { theme } from '@util'

const DialogConfirmActions = ({ handleClose, handleConfirm }) => {
  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity style={styles.iconContainer} onPress={handleClose}>
        <Icon
          type='ionicon'
          name='md-close'
          color={theme.color.error}
          reverse
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconContainer} onPress={handleConfirm}>
        <Icon
          type='ionicon'
          name='md-checkmark'
          color={theme.color.success}
          reverse
        />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  iconContainer: {
    paddingHorizontal: '8%',
    paddingVertical: '3%'
  }
})

DialogConfirmActions.propTypes = {
  handleClose: PropTypes.func,
  handleConfirm: PropTypes.func
}

export default DialogConfirmActions
