import React from 'react'
import PropTypes from 'prop-types'

import useUpdateUser from '@graphql/user/useUpdateUser'
import useNotification from '@hooks/useNotification'

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import DatePicker from 'react-native-modal-datetime-picker'
import { View, StyleSheet } from 'react-native'
import { StyledInput, StyledTouchable } from '@common'

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

const NewUserInformation = ({
  onFocus,
  userId,
  nextPressed,
  resetPressed,
  goNext
}) => {
  const [input, setInput] = React.useState(initialState)
  const [datePicker, setDatePicker] = React.useState(initialPickerState)
  const { throwError, throwLoading, closeNotification } = useNotification()
  const [updateUser] = useUpdateUser({
    onCompleted: () => {
      closeNotification()
      goNext()
    }
  })

  React.useEffect(() => {
    if (nextPressed) {
      const errors = validateUpdates(input)

      if (errors.length) {
        throwError(errors.join('\n'))
        resetPressed()
      } else {
        throwLoading(true)
        updateUser({ id: userId, updates: input })
      }
    }
  }, [nextPressed])

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

  return (
    <React.Fragment>
      <KeyboardAwareScrollView
        enableOnAndroid
        innerRef={ref => (this.newScroll = ref)}
        contentContainerStyle={{ flex: 1 }}
      >
        <View style={styles.container}>
          {inputMap.map(({ label, value }) => {
            if (value === 'dob') {
              const placeholder = ''

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
                onFocus={event => onFocus(event.target)}
              />
            )
          })}
        </View>
      </KeyboardAwareScrollView>
      <DatePicker
        date={input.dob}
        isVisible={datePicker.visible}
        onConfirm={handleDatePickerConfirm}
        onCancel={handleDatePickerCancel}
        is24Hour={false}
        minimumDate={EIGHTEEN_YEARS_AGO}
      />
    </React.Fragment>
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
  onFocus: PropTypes.func,
  userId: PropTypes.string,
  nextPressed: PropTypes.bool,
  goNext: PropTypes.func,
  resetPressed: PropTypes.func
}

export default NewUserInformation
