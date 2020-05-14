import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types'

import DatePicker from 'react-native-modal-datetime-picker'
import { View, StyleSheet } from 'react-native'
import { StyledInput, StyledTouchable } from '@common'
import { theme, formatDateTime, stripTime } from '@util'
import {
  LoginInputMap,
  SignupInputMap,
  OAuthSignupInputMap
} from '@components/auth/utilComponents/authUtil'
import { EIGHTEEN_YEARS_AGO } from '@util/constants'

const initialState = { visible: false, placeholder: true }

const AuthForm = ({ onFocus, inputState, setInput, screen }) => {
  const [datePicker, setDatePicker] = useState(initialState)
  let inputs =
    screen === 'Login'
      ? LoginInputMap
      : screen === 'Signup'
      ? SignupInputMap
      : OAuthSignupInputMap

  const updateInput = (value, text) => {
    setInput({ ...inputState, [value]: text })
  }

  const handleDatePickerCancel = () => {
    setDatePicker(initialState)
  }

  const handleDatePickerConfirm = date => {
    setDatePicker({ visible: false, placeholder: false })
    updateInput('dob', stripTime(date))
  }

  return (
    <Fragment>
      <View style={styles.container}>
        {inputs.map(({ label, value }) => {
          // Date of birth
          if (value === 'dob') {
            const placeholder = 'Date of Birth'

            return (
              <StyledTouchable
                key={value}
                text={
                  datePicker.placeholder
                    ? placeholder
                    : formatDateTime({ type: 'date', date: inputState.dob })
                }
                styleProps={styles.touchable}
                backgroundColor={theme.color.tertiary}
                color={
                  datePicker.placeholder
                    ? theme.color.placeholder
                    : theme.color.background
                }
                onPress={() => setDatePicker({ ...datePicker, visible: true })}
              />
            )
          }

          // Text inputs
          const secureTextEntry = ['password', 'confirmPass'].includes(value)

          return (
            <StyledInput
              key={value}
              onFocus={event => onFocus(event.target)}
              value={inputState[value]}
              onChange={({ nativeEvent }) =>
                updateInput(value, nativeEvent.text)
              }
              placeholder={label}
              autoCapitalize='none'
              autoCorrect={false}
              secureTextEntry={secureTextEntry}
              backgroundColor={theme.color.tertiary}
              color={theme.color.background}
              containerStyle={styles.inputContainer}
            />
          )
        })}
      </View>
      <DatePicker
        date={inputState.dob}
        isVisible={datePicker.visible}
        onConfirm={handleDatePickerConfirm}
        onCancel={handleDatePickerCancel}
        is24Hour={false}
        minimumDate={EIGHTEEN_YEARS_AGO}
      />
    </Fragment>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center'
  },
  inputContainer: {
    marginVertical: '1%'
  },
  touchable: {
    marginTop: '1%'
  }
})

AuthForm.propTypes = {
  onFocus: PropTypes.func,
  inputState: PropTypes.object,
  setInput: PropTypes.func,
  screen: PropTypes.string
}

export default AuthForm
