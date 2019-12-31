import React from 'react'
import PropTypes from 'prop-types'
import { Keyboard, TouchableWithoutFeedback } from 'react-native'

const KeyboardDismiss = ({ children }) => {
  return <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    {children}
  </TouchableWithoutFeedback>
}

KeyboardDismiss.propTypes = {
  children: PropTypes.node
}

export default KeyboardDismiss