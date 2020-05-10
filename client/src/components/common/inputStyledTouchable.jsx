import React from 'react'
import PropTypes from 'prop-types'

import { theme } from '@util'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

const InputStyledTouchable = ({
  handlePress,
  labelTitle,
  text,
  styleProps,
  reverse,
  centerText = false
}) => {
  const backgroundColor = reverse ? theme.color.background : theme.color.accent
  return (
    <TouchableOpacity onPress={handlePress} style={styleProps}>
      <Text style={styles.label}>{labelTitle}</Text>
      <View style={[styles.inputContainer, { backgroundColor }]}>
        <Text
          style={[styles.input, centerText && styles.center]}
          numberOfLines={1}
        >
          {text}
        </Text>
      </View>
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
  labelTitle: PropTypes.string.isRequired,
  text: PropTypes.string,
  handlePress: PropTypes.func,
  styleProps: PropTypes.object,
  centerText: PropTypes.bool,
  reverse: PropTypes.bool
}

export default InputStyledTouchable
