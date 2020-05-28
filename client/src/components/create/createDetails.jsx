import React, { useState, Fragment } from 'react'

import useCreate from '@context/createContext'

import DateTimePicker from '@components/create/createDateTimePicker'
import ImageList from '@components/create/createImageList'
import Picker from '@components/create/createPicker'
import DetailModal from '@components/create/createModal'

import { theme } from '@util'
import { inputMap } from '@components/create/utilComponents/createUtil'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import ReactNative, { View, StyleSheet, Keyboard } from 'react-native'
import { StyledTouchable, StyledSwitch, StyledInput } from '@common'

const CreateDetails = () => {
  const [modalValue, setModalValue] = useState(null)
  const { updateDetails, details } = useCreate()

  // Programmatically scroll to inputs
  const scrollToInput = node => {
    this.createScroll.props.scrollToFocusedInput(node)
  }

  return (
    <Fragment>
      <KeyboardAwareScrollView
        enableOnAndroid
        contentContainerStyle={styles.awareContainer}
        innerRef={ref => (this.createScroll = ref)}
      >
        <View style={styles.view}>
          <ImageList />
          <View style={[styles.formContainer, styles.marginBottom]}>
            {inputMap.map(({ label, value, ...rest }) => {
              const { date, type } = details

              // Date and Time component
              if (value === 'date') {
                return (
                  <DateTimePicker
                    key={value}
                    date={date}
                    setDate={date => updateDetails('date', date)}
                  />
                )
              }

              // Event type component
              if (value === 'type') {
                return (
                  <Picker
                    key={value}
                    value={type}
                    onValueChange={value => {
                      Keyboard.dismiss()
                      updateDetails('type', value)
                    }}
                  />
                )
              }

              // Location type component
              if (['location', 'description'].includes(value)) {
                return (
                  <StyledTouchable
                    key={value}
                    labelTitle={label}
                    text={details[value]?.text || details[value]}
                    onPress={() => setModalValue({ label, value })}
                  />
                )
              }

              // Plus one and Private component
              if (['plusOne', 'isPrivate'].includes(value)) {
                return (
                  <StyledSwitch
                    key={value}
                    value={details[value]}
                    label={label}
                    handleChange={item => updateDetails(value, item)}
                  />
                )
              }

              // Input components
              return (
                <StyledInput
                  onFocus={event => {
                    scrollToInput(ReactNative.findNodeHandle(event.target))
                  }}
                  key={value}
                  label={label}
                  autoCapitalize={value === 'website' ? 'none' : 'words'}
                  onChange={({ nativeEvent }) =>
                    updateDetails(value, nativeEvent.text)
                  }
                  value={details[value]}
                  {...rest}
                />
              )
            })}
          </View>
        </View>
      </KeyboardAwareScrollView>

      <DetailModal
        modalValue={modalValue}
        clearValue={() => setModalValue(null)}
        detail={details[modalValue?.value]}
        handleChange={value => updateDetails(modalValue.value, value)}
      />
    </Fragment>
  )
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    alignItems: 'center'
  },
  marginBottom: {
    marginBottom: '5%'
  },
  formContainer: {
    width: '100%',
    alignItems: 'center'
  },
  awareContainer: {
    backgroundColor: theme.color.background
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '3%',
    width: '100%'
  },
  label: {
    color: theme.color.tertiary,
    fontWeight: 'bold',
    fontSize: 16,
    paddingBottom: '1%'
  }
})

export default CreateDetails
