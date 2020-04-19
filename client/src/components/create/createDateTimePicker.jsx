import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types'
import dayjs from 'dayjs'

import DateTimePicker from 'react-native-modal-datetime-picker'
import { View, StyleSheet } from 'react-native'

import { StyledTouchable } from '@common'
import { DATE_FORMAT, TIME_FORMAT } from '@components/util/constants'

const CreateDateTimePicker = ({ date, setDate }) => {
  const [state, setState] = useState({ visible: false, mode: 'date' })
  const { mode, visible } = state

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
        <StyledTouchable
          labelTitle='Date'
          text={dayjs(date).format(DATE_FORMAT)}
          centerText
          handlePress={() => handlePress('date')}
          styleProps={styles.dateInputContainer}
        />
        <StyledTouchable
          labelTitle='Time'
          text={dayjs(date).format(TIME_FORMAT)}
          centerText
          handlePress={() => handlePress('time')}
          styleProps={styles.timeInputContainer}
        />
      </View>
      <DateTimePicker
        date={date}
        isVisible={visible}
        onConfirm={handleDTPickerConfirm}
        onCancel={handleCancel}
        mode={mode}
        is24Hour={false}
        minimumDate={new Date()}
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
  dateInputContainer: {
    width: '60%'
  },
  timeInputContainer: {
    width: '40%',
    marginLeft: '3%'
  }
})

CreateDateTimePicker.propTypes = {
  date: PropTypes.object.isRequired,
  setDate: PropTypes.func.isRequired
}

export default CreateDateTimePicker
