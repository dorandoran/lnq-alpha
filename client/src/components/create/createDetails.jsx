import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types'
import dayjs from 'dayjs'

import { theme } from '@src/theme'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { View, StyleSheet, Switch, Text, TouchableOpacity } from 'react-native'
import { Input } from 'react-native-elements'

import Header from '@components/create/createHeader'
import ImageList from '@components/create/createImageList'
import DateTimePicker from 'react-native-modal-datetime-picker'

import {
  KEYBOARD_AVOID_HEIGHT,
  TOMORROW_DATETIME,
  DATE_FORMAT,
  TIME_FORMAT
} from '@common/constants'

const inputMap = [
  {
    label: 'Event Name',
    value: 'name'
  },
  {
    label: 'Event Type',
    value: 'type'
  },
  {
    label: 'Location',
    value: 'location'
  },
  {
    label: 'Date and Time',
    value: 'date',
    disabled: true
  },
  {
    label: 'Brief Description',
    value: 'description'
  }
]

const switchMap = [
  { label: 'Plus One', value: 'plusOne' },
  { label: 'Private', value: 'isPrivate' }
]

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

  const onChange = (e, value) => {
    setState(prevState => ({ ...prevState, [value]: e?.text || e.value }))
  }

  const handleDTInputPress = mode => {
    setDTPicker({ mode, visible: true })
  }

  const handlePickerConfirm = dt => {
    const { mode } = dtPicker
    const { date } = state
    setDTPicker({ mode, visible: false })

    if (mode === 'date') {
      const newDate = dayjs(dt).format(DATE_FORMAT)
      const time = dayjs(date).format(TIME_FORMAT)
      const newDateTime = dayjs(`${newDate} ${time}`).toDate()
      setState({ ...state, date: newDateTime })
    }
    if (mode === 'time') {
      const _date = dayjs(date).format(DATE_FORMAT)
      const newTime = dayjs(dt).format(TIME_FORMAT)
      const newDateTime = dayjs(`${_date} ${newTime}`).toDate()
      setState({ ...state, date: newDateTime })
    }
  }

  const handlePickerCancel = () => {
    setDTPicker({ ...dtPicker, visible: false })
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
              const { date } = state
              // Date and Time components have different format
              if (value === 'date') {
                return (
                  <View
                    key={value}
                    style={[styles.dateContainer, styles.containerStyle]}
                  >
                    <TouchableOpacity
                      onPress={() => handleDTInputPress('date')}
                      style={styles.dateInputContainer}
                    >
                      <Input
                        label="Date"
                        inputContainerStyle={styles.inputContainer}
                        labelStyle={styles.label}
                        inputStyle={styles.disabledInput}
                        disabledInputStyle={styles.input}
                        underlineColorAndroid="transparent"
                        disabled
                        value={dayjs(date).format(DATE_FORMAT)}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => handleDTInputPress('time')}
                      style={styles.timeInputContainer}
                    >
                      <Input
                        label="Time"
                        inputContainerStyle={styles.inputContainer}
                        labelStyle={styles.label}
                        inputStyle={styles.disabledInput}
                        disabledInputStyle={styles.input}
                        underlineColorAndroid="transparent"
                        disabled
                        value={dayjs(date).format(TIME_FORMAT)}
                      />
                    </TouchableOpacity>
                  </View>
                )
              }
              // Components for the other maps
              return (
                <Input
                  key={value}
                  containerStyle={styles.containerStyle}
                  inputContainerStyle={styles.inputContainer}
                  labelStyle={styles.label}
                  inputStyle={styles.input}
                  underlineColorAndroid="transparent"
                  label={label}
                  onChange={({ nativeEvent }) => onChange(nativeEvent, value)}
                  value={state[value]}
                  {...rest}
                />
              )
            })}
            {switchMap.map(({ label, value }) => (
              <View style={styles.switchContainer} key={value}>
                <Text style={styles.label}>{label}</Text>
                <Switch
                  value={state[value]}
                  onChange={({ nativeEvent }) => onChange(nativeEvent, value)}
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
      <DateTimePicker
        isVisible={dtPicker.visible}
        onConfirm={handlePickerConfirm}
        onCancel={handlePickerCancel}
        mode={dtPicker.mode}
        is24Hour={false}
        isDarkModeEnabled
      />
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
    marginBottom: '5%'
  },
  containerStyle: {
    marginBottom: '5%'
  },
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around'
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
  },
  disabledInput: {
    textAlign: 'center'
  },
  dateInputContainer: {
    width: '60%'
  },
  timeInputContainer: {
    width: '40%'
  }
})

CreateDetails.propTypes = {
  route: PropTypes.object.isRequired
}

export default CreateDetails
