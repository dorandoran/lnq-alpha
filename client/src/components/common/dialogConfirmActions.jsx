import React from 'react'
import PropTypes from 'prop-types'

import { View, TouchableOpacity, StyleSheet } from 'react-native'
import { Icon } from 'react-native-elements'
import { theme } from '@util'

const DialogConfirmActions = ({
  handleClose,
  handleConfirm,
  disableConfirm
}) => {
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
      <TouchableOpacity
        disabled={disableConfirm}
        style={styles.iconContainer}
        onPress={handleConfirm}
      >
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
    marginTop: '1%',
    marginBottom: '5%',
    marginHorizontal: '8%'
  }
})

DialogConfirmActions.propTypes = {
  handleClose: PropTypes.func,
  handleConfirm: PropTypes.func,
  disableConfirm: PropTypes.bool
}

export default DialogConfirmActions
