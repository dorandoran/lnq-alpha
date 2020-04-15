import React, { useState, useContext } from 'react'
import CreateContext from '@context/createContext'

import { theme } from '@src/theme'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { View, StyleSheet, Switch, Text, Keyboard } from 'react-native'
import { Input } from 'react-native-elements'

import DateTimePicker from '@components/create/createDateTimePicker'
import ImageList from '@components/create/createImageList'
import Picker from '@components/create/createPicker'

import { KEYBOARD_AVOID_HEIGHT } from '@components/util/constants'
import { inputMap } from '@components/create/utilComponents/createUtil'

const initialDTState = {
  visible: false,
  mode: 'date'
}

const CreateDetails = () => {
  const [dtPicker, setDTPicker] = useState(initialDTState)
  const { updateDetails, details } = useContext(CreateContext)

  return (
    <KeyboardAwareScrollView
      enableOnAndroid
      extraHeight={KEYBOARD_AVOID_HEIGHT}
      contentContainerStyle={styles.awareContainer}
    >
      <View style={styles.container}>
        <ImageList />
        <View style={styles.formContainer}>
          {inputMap.map(({ label, value, ...rest }) => {
            const { date, type } = details

            // Date and Time component
            if (value === 'date') {
              return (
                <DateTimePicker
                  key={value}
                  date={date}
                  state={dtPicker}
                  setState={setDTPicker}
                  setDate={date => updateDetails('date', date)}
                />
              )
            }

            // Event type component
            if (value === 'type') {
              return (
                <Picker
                  key={value}
                  value={type}
                  onValueChange={value => {
                    Keyboard.dismiss()
                    updateDetails('type', value)
                  }}
                />
              )
            }

            // Plus one and Private component
            if (['plusOne', 'isPrivate'].includes(value)) {
              return (
                <View style={styles.switchContainer} key={value}>
                  <Text style={styles.label}>{label}</Text>
                  <Switch
                    value={details[value]}
                    onChange={({ nativeEvent }) =>
                      updateDetails(value, nativeEvent.value)
                    }
                    thumbColor={
                      details[value] ? theme.color.secondary : '#f4f3f4'
                    }
                    trackColor={{
                      false: '#767577',
                      true: theme.color.secondaryAccent
                    }}
                  />
                </View>
              )
            }

            // Input components
            return (
              <Input
                key={value}
                containerStyle={styles.containerStyle}
                inputContainerStyle={styles.inputContainer}
                labelStyle={styles.label}
                inputStyle={styles.input}
                underlineColorAndroid="transparent"
                label={label}
                onChange={({ nativeEvent }) =>
                  updateDetails(value, nativeEvent.text)
                }
                value={details[value]}
                {...rest}
              />
            )
          })}
        </View>
      </View>
    </KeyboardAwareScrollView>
  )
}

const styles = StyleSheet.create({
  awareContainer: {
    backgroundColor: theme.color.background
  },
  container: {
    flex: 1,
    alignItems: 'center'
  },
  formContainer: {
    width: '100%',
    marginBottom: '5%',
    alignItems: 'center'
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
    padding: '3%',
    width: '100%'
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

export default CreateDetails
