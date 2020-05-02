import React from 'react'
import PropTypes from 'prop-types'

import { View, Text, Switch, StyleSheet } from 'react-native'
import { theme } from '@util'

const InputStyledSwitch = ({ value, label, handleChange }) => {
  return (
    <View style={styles.switchContainer}>
      <Text style={styles.label}>{label}</Text>
      <Switch
        value={value}
        onChange={({ nativeEvent }) => handleChange(nativeEvent.value)}
        thumbColor={value ? theme.color.secondary : '#f4f3f4'}
        trackColor={{
          false: '#767577',
          true: theme.color.secondaryAccent
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '3%',
    width: '100%'
  },
  label: {
    color: theme.color.tertiary,
    fontWeight: 'bold',
    fontSize: 16,
    paddingBottom: '1%'
  }
})

InputStyledSwitch.propTypes = {
  value: PropTypes.bool,
  label: PropTypes.string,
  handleChange: PropTypes.func
}

export default InputStyledSwitch
