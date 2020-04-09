import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import dayjs from 'dayjs'

import DateTimePicker from 'react-native-modal-datetime-picker'
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native'

import { theme } from '@src/theme'
import { DATE_FORMAT, TIME_FORMAT } from '@common/constants'

const CreateDateTimePicker = ({ date, state, setState, setDate }) => {
  const { visible, mode } = state

  const handlePress = mode => {
    setState({ mode, visible: true })
  }

  const handleCancel = () => {
    setState({ ...state, visible: false })
  }

  const handleDTPickerConfirm = dt => {
    setState({ mode, visible: false })

    if (mode === 'date') {
      const newDate = dayjs(dt).format(DATE_FORMAT)
      const time = dayjs(date).format(TIME_FORMAT)
      const newDateTime = dayjs(`${newDate} ${time}`).toDate()
      setDate(newDateTime)
    }
    if (mode === 'time') {
      const _date = dayjs(date).format(DATE_FORMAT)
      const newTime = dayjs(dt).format(TIME_FORMAT)
      const newDateTime = dayjs(`${_date} ${newTime}`).toDate()
      setDate(newDateTime)
    }
  }

  return (
    <Fragment>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => handlePress('date')}
          style={styles.dateInputContainer}
        >
          <Text style={styles.label}>Date</Text>
          <View style={styles.inputContainer}>
            <Text style={styles.input}>{dayjs(date).format(DATE_FORMAT)}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handlePress('time')}
          style={styles.timeInputContainer}
        >
          <Text style={styles.label}>Time</Text>
          <View style={styles.inputContainer}>
            <Text style={styles.input}>{dayjs(date).format(TIME_FORMAT)}</Text>
          </View>
        </TouchableOpacity>
      </View>
      <DateTimePicker
        date={date}
        isVisible={visible}
        onConfirm={handleDTPickerConfirm}
        onCancel={handleCancel}
        mode={mode}
        is24Hour={false}
      />
    </Fragment>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '93%',
    marginBottom: '5%',
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  inputContainer: {
    height: 40,
    backgroundColor: theme.color.accent,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center'
  },
  dateInputContainer: {
    width: '60%'
  },
  timeInputContainer: {
    width: '40%',
    marginLeft: '3%'
  },
  label: {
    color: theme.color.tertiary,
    fontWeight: 'bold',
    fontSize: 16,
    paddingBottom: '1%'
  },
  input: {
    textAlign: 'center',
    color: theme.color.tertiary,
    fontSize: 18
  }
})

CreateDateTimePicker.propTypes = {
  date: PropTypes.object.isRequired,
  state: PropTypes.object.isRequired,
  setState: PropTypes.func.isRequired,
  setDate: PropTypes.func.isRequired
}

export default CreateDateTimePicker
