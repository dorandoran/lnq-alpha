import React from 'react'
import PropTypes from 'prop-types'

import Picker from 'react-native-picker-select'

import { View, Text, StyleSheet, Keyboard } from 'react-native'
import { theme, EVENT_TYPES } from '@util'

const CreatePicker = ({ value, onValueChange, reverseColor }) => {
  const placeholder = { label: 'Select an Event Type', value: '' }
  const items = Object.keys(EVENT_TYPES).map(value => {
    return { label: EVENT_TYPES[value], value }
  })

  const stylesAfterColor = {
    inputAndroid: {
      color: theme.color.tertiary,
      fontSize: 18,
      backgroundColor: reverseColor
        ? theme.color.background
        : theme.color.accent,
      borderRadius: 25,
      paddingLeft: '3%',
      borderBottomWidth: 0,
      height: 40,
      justifyContent: 'center'
    },
    viewContainer: {
      backgroundColor: reverseColor
        ? theme.color.background
        : theme.color.accent,
      borderRadius: 25,
      paddingLeft: '3%',
      borderBottomWidth: 0,
      height: 40,
      justifyContent: 'center'
    }
  }

  const allStyles = { ...styles, ...stylesAfterColor }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Event Type</Text>
      <Picker
        placeholder={placeholder}
        items={items}
        value={value}
        style={{ ...allStyles }}
        onValueChange={onValueChange}
        onOpen={Keyboard.dismiss}
        useNativeAndroidPickerStyle={false}
        touchableWrapperProps={{
          activeOpacity: 0.2
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '95%',
    marginBottom: '3%'
  },
  inputIOS: {
    color: theme.color.tertiary,
    fontSize: 18
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
  value: PropTypes.string,
  reverseColor: PropTypes.bool
}

export default CreatePicker
