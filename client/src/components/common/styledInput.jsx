import React from 'react'
import PropTypes from 'prop-types'

import { theme } from '@util'
import { StyleSheet } from 'react-native'
import { Input } from 'react-native-elements'

const StyledInput = ({
  onFocus,
  containerStyle,
  label,
  autoCapitalize,
  onChange,
  value,
  keyboardType
}) => {
  return (
    <Input
      label={label || ''}
      value={value}
      onFocus={onFocus}
      onChange={onChange}
      containerStyle={containerStyle}
      inputContainerStyle={styles.inputContainer}
      labelStyle={styles.label}
      inputStyle={styles.input}
      underlineColorAndroid='transparent'
      autoCapitalize={autoCapitalize}
      keyboardType={keyboardType}
    />
  )
}

const styles = StyleSheet.create({
  inputContainer: {
    backgroundColor: theme.color.accent,
    borderRadius: 25,
    paddingLeft: '3%',
    borderBottomWidth: 0
  },
  label: {
    color: theme.color.tertiary,
    fontWeight: 'bold',
    fontSize: 16,
    paddingBottom: '1%'
  },
  input: {
    color: theme.color.tertiary
  }
})

StyledInput.propTypes = {
  value: PropTypes.string,
  label: PropTypes.string,
  onFocus: PropTypes.func,
  onChange: PropTypes.func,
  containerStyle: PropTypes.object,
  autoCapitalize: PropTypes.string,
  keyboardType: PropTypes.string
}

export default StyledInput
