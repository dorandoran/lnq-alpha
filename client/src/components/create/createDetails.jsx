import React, { useContext, useState, Fragment } from 'react'
import CreateContext from '@context/createContext'

import { theme } from '@src/theme'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import ReactNative, {
  View,
  StyleSheet,
  Switch,
  Text,
  Keyboard
} from 'react-native'
import { Input } from 'react-native-elements'

import DateTimePicker from '@components/create/createDateTimePicker'
import ImageList from '@components/create/createImageList'
import Picker from '@components/create/createPicker'
import DetailModal from '@components/create/createModal'

import { StyledTouchable } from '@common'
import { inputMap } from '@components/create/utilComponents/createUtil'

const CreateDetails = () => {
  const [modalValue, setModalValue] = useState(null)
  const { updateDetails, details } = useContext(CreateContext)

  // Programmatically scroll to inputs
  const _scrollToInput = node => {
    this.scroll.props.scrollToFocusedInput(node)
  }

  return (
    <Fragment>
      <KeyboardAwareScrollView
        enableOnAndroid
        contentContainerStyle={styles.awareContainer}
        innerRef={ref => (this.scroll = ref)}
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
                    handlePress={() => setModalValue({ label, value })}
                    styleProps={{ width: '95%', marginBottom: '5%' }}
                  />
                )
              }

              // Plus one and Private component
              if (['plusOne', 'isPrivate'].includes(value)) {
                return (
                  <View style={styles.switchContainer} key={value}>
                    <Text style={styles.label}>{label}</Text>
                    <Switch
                      value={details[value]}
                      onChange={({ nativeEvent }) =>
                        updateDetails(value, nativeEvent.value)
                      }
                      thumbColor={
                        details[value] ? theme.color.secondary : '#f4f3f4'
                      }
                      trackColor={{
                        false: '#767577',
                        true: theme.color.secondaryAccent
                      }}
                    />
                  </View>
                )
              }

              // Input components
              return (
                <Input
                  onFocus={event => {
                    _scrollToInput(ReactNative.findNodeHandle(event.target))
                  }}
                  key={value}
                  containerStyle={styles.marginBottom}
                  inputContainerStyle={styles.inputContainer}
                  labelStyle={styles.label}
                  inputStyle={styles.input}
                  underlineColorAndroid='transparent'
                  label={label}
                  autoCapitalize={value === 'url' ? 'none' : 'words'}
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
  inputContainer: {
    backgroundColor: theme.color.accent,
    borderRadius: 25,
    paddingLeft: '3%',
    borderBottomWidth: 0
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
  },
  input: {
    color: theme.color.tertiary
  }
})

export default CreateDetails
