import React, { useState } from 'react'
import { View, StyleSheet, Switch } from 'react-native'
import { Input } from 'react-native-elements'
import { Text } from 'react-native-elements'

import { theme } from '@src/theme'

const CreateForm = () => {
  const [checked, setChecked] = useState(false)
  const [switched, setSwitch] = useState(false)

  return (
    <View style={styles.container}>
      <Input
        containerStyle={styles.containerStyle}
        inputContainerStyle={styles.inputContainer}
        labelStyle={styles.label}
        inputStyle={styles.input}
        underlineColorAndroid="transparent"
        label="Event Type"
      />
      <Input
        labelStyle={styles.label}
        containerStyle={styles.containerStyle}
        inputContainerStyle={styles.inputContainer}
        inputStyle={styles.input}
        underlineColorAndroid="transparent"
        label="Event Title"
      />
      <Input
        labelStyle={styles.label}
        containerStyle={styles.containerStyle}
        inputContainerStyle={styles.inputContainer}
        inputStyle={styles.input}
        underlineColorAndroid="transparent"
        label="Location"
      />
      <Input
        labelStyle={styles.label}
        containerStyle={styles.containerStyle}
        inputContainerStyle={styles.inputContainer}
        inputStyle={styles.input}
        underlineColorAndroid="transparent"
        label="Date and Time"
      />
      <Input
        labelStyle={styles.label}
        containerStyle={styles.containerStyle}
        inputContainerStyle={styles.inputContainer}
        inputStyle={styles.input}
        underlineColorAndroid="transparent"
        label="Brief Description"
      />
      <View style={styles.switchContainer}>
        <Text style={styles.label}>Plus One</Text>
        <Switch
          value={checked}
          onValueChange={() => setChecked(!checked)}
          thumbColor={checked ? theme.color.secondary : '#f4f3f4'}
          trackColor={{ false: '#767577', true: theme.color.secondaryAccent }}
        />
      </View>
      <View style={styles.switchContainer}>
        <Text style={styles.label}>Plus One</Text>
        <Switch
          value={switched}
          onValueChange={() => setSwitch(!switched)}
          thumbColor={switched ? theme.color.secondary : '#f4f3f4'}
          trackColor={{ false: '#767577', true: theme.color.secondaryAccent }}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    // height: '100%',
    backgroundColor: theme.color.backgroundColor,
    marginBottom: '5%'
  },
  containerStyle: {
    marginBottom: '5%'
  },
  inputContainer: {
    backgroundColor: theme.color.accent,
    borderRadius: 25,
    paddingLeft: '3%',
    borderBottomWidth: 0
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '3%'
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

export default CreateForm
