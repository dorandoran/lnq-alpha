import React, { Fragment, useState } from 'react'

import useUpdateEvent from '@graphql/event/useUpdateEvent'
import useNotification from '@hooks/useNotification'
import useOverlay from '@context/overlayContext'

import LoadingDialog from '@components/overlay/loadingDialog'
import DateTimePicker from '@components/create/createDateTimePicker'

import { inputMap } from '@components/create/utilComponents/createUtil'
import { View, Text, StyleSheet } from 'react-native'
import { Input } from 'react-native-elements'
import { DialogConfirmActions, LocationAutoComplete } from '@common'
import { theme } from '@util'
import { SCREEN_WIDTH } from '@util/constants'

const ActionUpdateEventDialog = () => {
  const {
    dispatch,
    actions,
    dialog: { cache }
  } = useOverlay()
  const keyTitle = inputMap.find(input => input.value === cache.key).label
  const [attr, setAttr] = useState(cache.event[cache.key])
  const { throwSuccess } = useNotification()
  const [updateEvent, loading] = useUpdateEvent({
    onCompleted: () => {
      throwSuccess(`${keyTitle} updated!`)
      handleClose()
    }
  })

  const handleConfirm = () => {
    updateEvent({ id: cache.event.id, updates: { [cache.key]: attr } })
  }

  const handleClose = () => {
    dispatch({ type: actions.dialog.close })
  }

  if (loading) return <LoadingDialog />

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
              setDate={setAttr}
              reverseColor
            />
          </View>
        )
      case 'url':
      case 'description':
        return (
          <Input
            containerStyle={styles.marginBottom}
            inputContainerStyle={styles.inputContainer}
            labelStyle={styles.label}
            inputStyle={styles.input}
            underlineColorAndroid='transparent'
            autoCapitalize={cache.key === 'url' ? 'none' : 'sentences'}
            keyboardType={cache.key === 'url' ? 'email-address' : 'default'}
            onChangeText={text => setAttr(text)}
            multiline={cache.key === 'description' ? true : false}
            value={attr}
            maxLength={300}
          />
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
  inputContainer: {
    backgroundColor: theme.color.background,
    borderRadius: 25,
    paddingHorizontal: '5%',
    paddingVertical: '1%',
    borderBottomWidth: 0
  },
  message: {
    textAlign: 'center',
    fontSize: 24,
    color: theme.color.tertiary
  },
  key: {
    fontSize: 20,
    color: theme.color.secondary
  },
  input: {
    color: theme.color.tertiary
  },
  center: {
    alignItems: 'center'
  }
})

export default ActionUpdateEventDialog
