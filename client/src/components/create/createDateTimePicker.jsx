import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types'

import DateTimePicker from 'react-native-modal-datetime-picker'
import { View, StyleSheet } from 'react-native'

import { StyledTouchable } from '@common'
import { updateDateTime } from '@components/create/utilComponents/createUtil'
import { formatDateTime } from '@util'

const CreateDateTimePicker = ({ date, setDate, reverseColor }) => {
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
    setDate(updateDateTime({ newDT: dt, oldDT: date, mode }))
  }

  return (
    <Fragment>
      <View style={styles.container}>
        <StyledTouchable
          labelTitle='Date'
          text={formatDateTime({ type: 'date', date })}
          centerText
          handlePress={() => handlePress('date')}
          styleProps={styles.dateInputContainer}
          reverse={reverseColor}
        />
        <StyledTouchable
          labelTitle='Time'
          text={formatDateTime({ type: 'time', date })}
          centerText
          handlePress={() => handlePress('time')}
          styleProps={styles.timeInputContainer}
          reverse={reverseColor}
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
  setDate: PropTypes.func.isRequired,
  reverseColor: PropTypes.bool
}

export default CreateDateTimePicker
