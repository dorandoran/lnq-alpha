import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types'

import { theme } from '@src/theme'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { View, StyleSheet, Switch, Text } from 'react-native'
import { Input } from 'react-native-elements'

import DateTimePicker from '@components/create/createDateTimePicker'
import Header from '@components/create/createHeader'
import ImageList from '@components/create/createImageList'
import Picker from '@components/create/createPicker'

import { KEYBOARD_AVOID_HEIGHT, TOMORROW_DATETIME } from '@common/constants'
import {
  inputMap,
  switchMap
} from '@components/create/utilComponents/createUtil'

const initialState = {
  name: '',
  type: '',
  location: '',
  date: TOMORROW_DATETIME,
  description: '',
  plusOne: true,
  isPrivate: true
}

const initialDTState = {
  visible: false,
  mode: 'date'
}

const CreateDetails = ({ route }) => {
  const [dtPicker, setDTPicker] = useState(initialDTState)
  const [state, setState] = useState(initialState)
  const media = route.params.media

  const handleInputChange = (e, value) => {
    setState(prevState => ({ ...prevState, [value]: e?.text || e.value }))
  }

  const handleDateChange = date => {
    setState({ ...state, date })
  }

  const handlePickerChange = type => {
    setState({ ...state, type })
  }

  const resetForm = () => {
    setState(initialState)
    setDTPicker(initialDTState)
  }

  return (
    <Fragment>
      <Header event={{ ...state, media }} resetForm={resetForm} />
      <KeyboardAwareScrollView
        enableOnAndroid
        extraHeight={KEYBOARD_AVOID_HEIGHT}
        contentContainerStyle={styles.awareContainer}
      >
        <View style={styles.container}>
          <ImageList initialData={[media]} />
          <View style={styles.formContainer}>
            {inputMap.map(({ label, value, ...rest }) => {
              const { date, type } = state
              // Date and Time component
              if (value === 'date') {
                return (
                  <DateTimePicker
                    key={value}
                    date={date}
                    state={dtPicker}
                    setState={setDTPicker}
                    setDate={handleDateChange}
                  />
                )
              }
              // Event type component
              if (value === 'type') {
                return (
                  <Picker
                    key={value}
                    value={type}
                    onValueChange={handlePickerChange}
                  />
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
                    handleInputChange(nativeEvent, value)
                  }
                  value={state[value]}
                  {...rest}
                />
              )
            })}
            {/** Switch component **/}
            {switchMap.map(({ label, value }) => (
              <View style={styles.switchContainer} key={value}>
                <Text style={styles.label}>{label}</Text>
                <Switch
                  value={state[value]}
                  onChange={({ nativeEvent }) =>
                    handleInputChange(nativeEvent, value)
                  }
                  thumbColor={state[value] ? theme.color.secondary : '#f4f3f4'}
                  trackColor={{
                    false: '#767577',
                    true: theme.color.secondaryAccent
                  }}
                />
              </View>
            ))}
          </View>
        </View>
      </KeyboardAwareScrollView>
    </Fragment>
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

CreateDetails.propTypes = {
  route: PropTypes.object.isRequired
}

export default CreateDetails
