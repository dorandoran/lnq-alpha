import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import isEqual from 'lodash/isEqual'

import useUpdateNewUser from '@graphql/user/useUpdateNewUser'
import useNotification from '@hooks/useNotification'

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import DatePicker from 'react-native-modal-datetime-picker'
import { View, StyleSheet } from 'react-native'
import { StyledInput, StyledTouchable } from '@common'
import BottomBar from '@components/new/utilComponents/newBottomButtonBar'

import {
  inputMap,
  validateUpdates
} from '@components/new/utilComponents/newUtil'
import {
  PLACEHOLDER_18_YRS,
  EIGHTEEN_YEARS_AGO,
  theme,
  formatDateTime,
  stripTime
} from '@util'

const initialState = {
  username: '',
  dob: PLACEHOLDER_18_YRS,
  website: ''
}
const initialPickerState = { visible: false, placeholder: true }

const NewUserInformation = ({ userId, goNext }) => {
  const [input, setInput] = React.useState(initialState)
  const [datePicker, setDatePicker] = React.useState(initialPickerState)
  const { throwError, throwLoading, closeNotification } = useNotification()
  const [updateNewUser] = useUpdateNewUser({
    onCompleted: data => {
      const error = data.updateNewUser.response
      if (error.length) {
        throwError(error)
      } else {
        closeNotification()
        goNext()
      }
    }
  })

  const updateInput = (value, text) => {
    setInput({ ...input, [value]: text })
  }

  const handleDatePickerCancel = () => {
    setDatePicker(initialState)
  }

  const handleDatePickerConfirm = date => {
    setDatePicker({ visible: false, placeholder: false })
    updateInput('dob', stripTime(date))
  }

  const handleNext = () => {
    const errors = validateUpdates(input)

    if (errors.length) {
      throwError(errors.join('\n'))
    } else {
      throwLoading()
      updateNewUser({ id: userId, ...input })
    }
  }

  return (
    <Fragment>
      <KeyboardAwareScrollView
        enableOnAndroid
        contentContainerStyle={{ flex: 1 }}
      >
        <View style={styles.container}>
          {inputMap.map(({ label, value, ...rest }) => {
            if (value === 'dob') {
              const placeholder = formatDateTime({ type: 'date', date: initialState.dob }) || ''

              return (
                <StyledTouchable
                  key={value}
                  labelTitle={label}
                  text={
                    datePicker.placeholder
                      ? placeholder
                      : formatDateTime({ type: 'date', date: input.dob })
                  }
                  styleProps={styles.touchable}
                  color={
                    datePicker.placeholder
                      ? theme.color.placeholder
                      : theme.color.tertiary
                  }
                  onPress={() =>
                    setDatePicker({ ...datePicker, visible: true })
                  }
                />
              )
            }

            return (
              <StyledInput
                key={value}
                label={label}
                value={input[value]}
                placeholder=''
                onChange={({ nativeEvent }) =>
                  updateInput(value, nativeEvent.text)
                }
                {...rest}
              />
            )
          })}
        </View>
      </KeyboardAwareScrollView>
      <BottomBar
        disabled={isEqual(initialState, input)}
        onActionPress={handleNext}
      />
      <DatePicker
        date={input.dob}
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
    height: '75%',
    justifyContent: 'center',
    alignItems: 'center'
  }
})

NewUserInformation.propTypes = {
  userId: PropTypes.string,
  nextPressed: PropTypes.bool,
  goNext: PropTypes.func,
  resetPressed: PropTypes.func
}

export default NewUserInformation
