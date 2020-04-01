import React, { useState } from 'react'
import { Input } from 'react-native-elements'
import { StyleSheet } from 'react-native'

import { theme } from '@src/theme'

const CreateInput = () => {
  const [value, setValue] = useState('')

  return {
    setValue: setValue,
    Component: function Component() {
      return (
        <Input
          containerStyle={styles.containerStyle}
          inputContainerStyle={styles.inputContainer}
          labelStyle={styles.label}
          inputStyle={styles.input}
          underlineColorAndroid="transparent"
          label="Event Type"
          value={value}
        />
      )
    }
  }
}

const styles = StyleSheet.create({
  containerStyle: {
    marginBottom: '5%'
  },
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

export default CreateInput
