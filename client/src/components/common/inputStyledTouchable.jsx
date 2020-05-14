import React from 'react'
import PropTypes from 'prop-types'

import { theme } from '@util'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'

const InputStyledTouchable = ({
  onPress,
  labelTitle,
  text,
  styleProps,
  reverse,
  backgroundColor,
  color,
  centerText = false
}) => {
  const inputBackgroundColor = reverse
    ? theme.color.background
    : backgroundColor || theme.color.accent
  const inputColor = color || theme.color.tertiary

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.inputContainer,
        styleProps,
        { backgroundColor: inputBackgroundColor }
      ]}
    >
      {labelTitle && <Text style={styles.label}>{labelTitle}</Text>}
      <Text
        style={[
          styles.input,
          { color: inputColor },
          centerText && styles.center
        ]}
        numberOfLines={1}
      >
        {text}
      </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  label: {
    color: theme.color.tertiary,
    fontWeight: 'bold',
    fontSize: 16,
    paddingBottom: '1%'
  },
  inputContainer: {
    height: 40,
    borderRadius: 25,
    justifyContent: 'center'
  },
  input: {
    paddingHorizontal: '4%',
    color: theme.color.tertiary,
    fontSize: 18
  },
  center: {
    paddingLeft: 0,
    textAlign: 'center'
  }
})

InputStyledTouchable.propTypes = {
  labelTitle: PropTypes.string,
  text: PropTypes.string,
  onPress: PropTypes.func,
  styleProps: PropTypes.object,
  centerText: PropTypes.bool,
  reverse: PropTypes.bool,
  backgroundColor: PropTypes.string,
  color: PropTypes.string
}

export default InputStyledTouchable
