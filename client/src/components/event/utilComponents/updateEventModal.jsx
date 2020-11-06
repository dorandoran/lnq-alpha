import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types'

import DateTimePicker from '@components/create/createDateTimePicker'
import Picker from '@components/create/createPicker'

import { View, Text, StyleSheet } from 'react-native'
import {
  DialogConfirmActions,
  LocationAutoComplete,
  StyledSwitch,
  StyledInput
} from '@common'
import { theme, EVENT_FIELD_TITLES } from '@util'

const UpdateEventModal = ({
  modalActions,
  editActions,
  event,
  field,
  additionalFields
}) => {
  const getFieldValue = () => {
    let initialState = event[field]

    if (additionalFields) {
      initialState = { [field]: initialState }
      additionalFields.forEach(key => (initialState[key] = event[key]))
    }
    return initialState
  }

  const [fieldValue, setFieldValue] = useState(getFieldValue())

  const getFieldTitle = () => {
    let title = EVENT_FIELD_TITLES[field]

    if (additionalFields) {
      title = [
        title,
        ...additionalFields.map(value => EVENT_FIELD_TITLES[value])
      ].join(' - ')
    }
    return title
  }

  const handleConfirm = () => {
    let update = { [field]: fieldValue }

    if (['isPrivate', 'type', 'plusOne'].includes(field)) {
      update = fieldValue
    }

    editActions.addUpdate(update)
  }

  const handleClose = () => {
    modalActions.cancelModal()
  }

  const renderKeyComponent = () => {
    switch (field) {
      case 'location':
        return (
          <View style={styles.locationContainer}>
            <LocationAutoComplete
              handleSelect={location => setFieldValue(location)}
            />
          </View>
        )
      case 'date':
        return (
          <View style={styles.center}>
            <DateTimePicker
              date={new Date(fieldValue)}
              setDate={date => setFieldValue(date)}
              backgroundColor={theme.color.background}
            />
          </View>
        )
      case 'name':
      case 'website':
      case 'description':
        return (
          <StyledInput
            containerStyle={styles.marginBottom}
            backgroundColor={theme.color.background}
            autoCapitalize={field === 'website' ? 'none' : 'sentences'}
            keyboardType={field === 'website' ? 'email-address' : 'default'}
            onChangeText={text => setFieldValue(text)}
            multiline={field === 'description' ? true : false}
            value={fieldValue}
            maxLength={300}
          />
        )
      case 'type':
      case 'isPrivate':
      case 'plusOne':
        return (
          <Fragment>
            <Picker
              value={fieldValue.type}
              onValueChange={value =>
                setFieldValue({ ...fieldValue, type: value })
              }
              backgroundColor={theme.color.background}
              styleProps={styles.picker}
            />
            <StyledSwitch
              value={fieldValue.plusOne}
              label='Plus One'
              handleChange={value =>
                setFieldValue({ ...fieldValue, plusOne: value })
              }
            />
            <StyledSwitch
              value={fieldValue.isPrivate}
              label='Private'
              handleChange={value =>
                setFieldValue({ ...fieldValue, isPrivate: value })
              }
            />
          </Fragment>
        )
      default:
        throw new Error(
          'Incorrect event value key provided to \
          UpdateEventModal.jsx'
        )
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <Text style={styles.message}>Edit</Text>
        <Text style={styles.key}>{getFieldTitle()}</Text>
      </View>
      {renderKeyComponent()}
      <DialogConfirmActions
        handleClose={handleClose}
        handleConfirm={handleConfirm}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    alignItems: 'center',
    width: '90%',
    backgroundColor: theme.color.accent,
    borderRadius: 25,
    paddingHorizontal: '3%'
  },
  infoContainer: {
    paddingTop: '3%',
    paddingBottom: '6%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  locationContainer: {
    height: 200,
    width: '90%',
    borderBottomWidth: 1,
    borderBottomColor: theme.color.background
  },
  message: {
    textAlign: 'center',
    fontSize: 24,
    color: theme.color.tertiary
  },
  picker: {
    marginHorizontal: '3%'
  },
  key: {
    fontSize: 20,
    color: theme.color.secondary
  },
  center: {
    alignItems: 'center'
  }
})

UpdateEventModal.propTypes = {
  modalActions: PropTypes.object,
  editActions: PropTypes.object,
  event: PropTypes.object,
  field: PropTypes.string,
  additionalFields: PropTypes.array
}

export default UpdateEventModal
