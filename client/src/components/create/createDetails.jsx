import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types'

import { theme } from '@src/theme'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { View, StyleSheet, Switch, Text } from 'react-native'
import { Input } from 'react-native-elements'

import Header from '@components/create/createHeader'
import ImageList from '@components/create/createImageList'

import { KEYBOARD_AVOID_HEIGHT } from '@common/constants'

const inputMap = [
  {
    label: 'Event Name',
    value: 'name'
  },
  {
    label: 'Event Type',
    value: 'type'
  },
  {
    label: 'Location',
    value: 'location'
  },
  {
    label: 'Date and Time',
    value: 'date'
  },
  {
    label: 'Brief Description',
    value: 'description'
  }
]

const switchMap = [
  { label: 'Plus One', value: 'plusOne' },
  { label: 'Private', value: 'isPrivate' }
]

const initialState = {
  name: '',
  type: '',
  location: '',
  date: '',
  description: '',
  plusOne: true,
  isPrivate: true
}

const CreateDetails = ({ route }) => {
  const [state, setState] = useState(initialState)
  const media = route.params.media

  const onChange = (e, value) => {
    setState(prevState => ({ ...prevState, [value]: e?.text || e.value }))
  }

  const resetForm = () => {
    setState(initialState)
  }

  return (
    <Fragment>
      <Header event={{ ...state, media }} resetForm={resetForm} />
      <KeyboardAwareScrollView
        enableOnAndroid
        extraHeight={KEYBOARD_AVOID_HEIGHT}
        contentContainerStyle={styles.awareContainer}
      >
        <View style={styles.container}>
          <ImageList initialData={[media]} />
          <View style={styles.formContainer}>
            {inputMap.map(({ label, value }) => (
              <Input
                key={value}
                containerStyle={styles.containerStyle}
                inputContainerStyle={styles.inputContainer}
                labelStyle={styles.label}
                inputStyle={styles.input}
                underlineColorAndroid="transparent"
                label={label}
                onChange={({ nativeEvent }) => onChange(nativeEvent, value)}
                value={state[value]}
              />
            ))}
            {switchMap.map(({ label, value }) => (
              <View style={styles.switchContainer} key={value}>
                <Text style={styles.label}>{label}</Text>
                <Switch
                  value={state[value]}
                  onChange={({ nativeEvent }) => onChange(nativeEvent, value)}
                  thumbColor={state[value] ? theme.color.secondary : '#f4f3f4'}
                  trackColor={{
                    false: '#767577',
                    true: theme.color.secondaryAccent
                  }}
                />
              </View>
            ))}
          </View>
        </View>
      </KeyboardAwareScrollView>
    </Fragment>
  )
}

const styles = StyleSheet.create({
  awareContainer: {
    backgroundColor: theme.color.background
  },
  container: {
    flex: 1,
    alignItems: 'center'
  },
  formContainer: {
    width: '100%',
    marginBottom: '5%'
  },
  containerStyle: {
    marginBottom: '5%'
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
    padding: '3%'
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

CreateDetails.propTypes = {
  route: PropTypes.object.isRequired
}

export default CreateDetails
