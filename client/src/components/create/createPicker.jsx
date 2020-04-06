import React from 'react'
import PropTypes from 'prop-types'
import Picker from 'react-native-picker-select'
import { View, Text, StyleSheet } from 'react-native'

import { theme } from '@src/theme'
import { EVENT_TYPE_MAP } from '@common/constants'

const CreatePicker = ({ value, onValueChange }) => {
  const placeholder = { label: 'Select an Event Type', value: '' }
  const items = Object.keys(EVENT_TYPE_MAP).map(value => {
    return { label: EVENT_TYPE_MAP[value], value }
  })

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Event Type</Text>
      <Picker
        placeholder={placeholder}
        items={items}
        value={value}
        style={{ ...styles }}
        onValueChange={onValueChange}
        useNativeAndroidPickerStyle={false}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '95%',
    marginBottom: '5%'
  },
  inputAndroid: {
    color: theme.color.tertiary,
    fontSize: 18,
    backgroundColor: theme.color.accent,
    borderRadius: 25,
    paddingLeft: '3%',
    borderBottomWidth: 0,
    height: 40,
    justifyContent: 'center'
  },
  inputIOS: {
    color: theme.color.tertiary,
    fontSize: 18
  },
  viewContainer: {
    backgroundColor: theme.color.accent,
    borderRadius: 25,
    paddingLeft: '3%',
    borderBottomWidth: 0,
    height: 40,
    justifyContent: 'center'
  },
  label: {
    color: theme.color.tertiary,
    fontWeight: 'bold',
    fontSize: 16,
    paddingBottom: '1%'
  }
})

CreatePicker.propTypes = {
  onValueChange: PropTypes.func.isRequired,
  value: PropTypes.string
}

export default CreatePicker
