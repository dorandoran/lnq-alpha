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
  onChangeText,
  value,
  placeholder,
  keyboardType,
  autoCorrect,
  secureTextEntry,
  backgroundColor,
  color,
  multiline,
  maxLength
}) => {
  const inputBackgroundColor = backgroundColor || theme.color.accent
  const inputColor = color || theme.color.tertiary
  const borderRadius = multiline ? 15 : 25

  return (
    <Input
      label={label || ''}
      value={value}
      onFocus={onFocus}
      onChange={onChange}
      onChangeText={onChangeText}
      containerStyle={containerStyle}
      labelStyle={label ? styles.label : { height: 0 }}
      errorStyle={{ height: 0 }}
      inputContainerStyle={[
        styles.inputContainer,
        { backgroundColor: inputBackgroundColor, borderRadius }
      ]}
      inputStyle={{ color: inputColor }}
      underlineColorAndroid='transparent'
      autoCapitalize={autoCapitalize}
      keyboardType={keyboardType}
      placeholder={placeholder}
      autoCorrect={autoCorrect}
      secureTextEntry={secureTextEntry}
      multiline={multiline}
      maxLength={maxLength}
    />
  )
}

const styles = StyleSheet.create({
  inputContainer: {
    paddingLeft: '3%',
    borderBottomWidth: 0
  },
  label: {
    color: theme.color.tertiary,
    fontWeight: 'bold',
    fontSize: 16,
    paddingBottom: '1%'
  }
})

StyledInput.propTypes = {
  value: PropTypes.string,
  label: PropTypes.string,
  onFocus: PropTypes.func,
  onChange: PropTypes.func,
  onChangeText: PropTypes.func,
  containerStyle: PropTypes.object,
  autoCapitalize: PropTypes.string,
  keyboardType: PropTypes.string,
  placeholder: PropTypes.string,
  autoCorrect: PropTypes.bool,
  secureTextEntry: PropTypes.bool,
  backgroundColor: PropTypes.string,
  color: PropTypes.string,
  multiline: PropTypes.bool,
  maxLength: PropTypes.number
}

export default StyledInput
