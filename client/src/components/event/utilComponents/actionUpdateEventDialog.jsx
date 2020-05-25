import React, { Fragment, useState } from 'react'

import useOverlay from '@context/overlayContext'

import DateTimePicker from '@components/create/createDateTimePicker'
import Picker from '@components/create/createPicker'

import { View, Text, StyleSheet } from 'react-native'
import {
  DialogConfirmActions,
  LocationAutoComplete,
  StyledSwitch,
  StyledInput
} from '@common'
import { theme, SCREEN_WIDTH } from '@util'
import {
  getInitialState,
  getTitle
} from '@components/event/utilComponents/eventUtil'

const ActionUpdateEventDialog = () => {
  const {
    dispatch,
    actions,
    dialog: { cache } // cache: { key: string, additionalKeys: string[], updateKey: func, event: Event }
  } = useOverlay()
  const [attr, setAttr] = useState(getInitialState(cache))
  const keyTitle = getTitle(cache)

  const handleConfirm = () => {
    cache.updateKey({ key: cache.key, value: attr })
    handleClose()
  }

  const handleClose = () => {
    dispatch({ type: actions.dialog.close })
  }

  const renderKeyComponent = () => {
    switch (cache.key) {
      case 'location':
        return (
          <View style={styles.locationContainer}>
            <LocationAutoComplete
              handleSelect={location => setAttr(location)}
            />
          </View>
        )
      case 'date':
        return (
          <View style={styles.center}>
            <DateTimePicker
              date={new Date(attr)}
              setDate={date => setAttr(date)}
              backgroundColor={theme.color.background}
            />
          </View>
        )
      case 'name':
      case 'url':
      case 'description':
        return (
          <StyledInput
            containerStyle={styles.marginBottom}
            backgroundColor={theme.color.background}
            autoCapitalize={cache.key === 'url' ? 'none' : 'sentences'}
            keyboardType={cache.key === 'url' ? 'email-address' : 'default'}
            onChangeText={text => setAttr(text)}
            multiline={cache.key === 'description' ? true : false}
            value={attr}
            maxLength={300}
          />
        )
      case 'type':
      case 'isPrivate':
      case 'plusOne':
        return (
          <Fragment>
            <Picker
              value={attr.type}
              onValueChange={value => setAttr({ ...attr, type: value })}
              backgroundColor={theme.color.background}
              styleProps={styles.picker}
            />
            <StyledSwitch
              value={attr.plusOne}
              label='Plus One'
              handleChange={value => setAttr({ ...attr, plusOne: value })}
            />
            <StyledSwitch
              value={attr.isPrivate}
              label='Private'
              handleChange={value => setAttr({ ...attr, isPrivate: value })}
            />
          </Fragment>
        )
      default:
        throw new Error(
          'Incorrect event attribute key provided to \
          actionUpdateEventDialog.jsx'
        )
    }
  }

  return (
    <Fragment>
      <View style={styles.container}>
        <View style={styles.messageContainer}>
          <Text style={styles.message}>Edit</Text>
          <Text style={styles.key}>{keyTitle}</Text>
        </View>
        {renderKeyComponent()}
      </View>
      <DialogConfirmActions
        handleClose={handleClose}
        handleConfirm={handleConfirm}
      />
    </Fragment>
  )
}

const styles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH / 1.2
  },
  messageContainer: {
    paddingTop: '3%',
    paddingBottom: '6%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  locationContainer: {
    height: 200,
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

export default ActionUpdateEventDialog