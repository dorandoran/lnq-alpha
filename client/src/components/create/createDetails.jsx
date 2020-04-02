import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types'

import { theme } from '@src/theme'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { View, StyleSheet, Switch, Text } from 'react-native'
import { Input } from 'react-native-elements'

import Header from '@components/create/createHeader'
import ImageList from '@components/create/createImageList'

import { KEYBOARD_AVOID_HEIGHT } from '@src/constants'

const CreateDetails = ({ route }) => {
  const [name, setName] = useState('')
  const [type, setType] = useState('')
  const [location, setLocation] = useState('')
  const [date, setDate] = useState('')
  const [description, setDescription] = useState('')
  const [plusOne, setPlusOne] = useState(true)
  const [isPrivate, setPrivate] = useState(true)
  const media = route.params.media

  const getEvent = () => {
    return {
      name,
      type,
      location,
      date,
      description,
      plusOne,
      isPrivate,
      media
    }
  }

  return (
    <Fragment>
      <Header event={getEvent()} />
      <KeyboardAwareScrollView
        enableOnAndroid
        extraScrollHeight={KEYBOARD_AVOID_HEIGHT}
      >
        <View style={styles.container}>
          <ImageList initialData={[media]} />
          <View style={styles.formContainer}>
            <Input
              containerStyle={styles.containerStyle}
              inputContainerStyle={styles.inputContainer}
              labelStyle={styles.label}
              inputStyle={styles.input}
              underlineColorAndroid="transparent"
              label="Event Name"
              onChangeText={text => setName(text)}
              value={name}
            />
            <Input
              labelStyle={styles.label}
              containerStyle={styles.containerStyle}
              inputContainerStyle={styles.inputContainer}
              inputStyle={styles.input}
              underlineColorAndroid="transparent"
              label="Event Type"
              onChangeText={text => setType(text)}
              value={type}
            />
            <Input
              labelStyle={styles.label}
              containerStyle={styles.containerStyle}
              inputContainerStyle={styles.inputContainer}
              inputStyle={styles.input}
              underlineColorAndroid="transparent"
              label="Location"
              onChangeText={text => setLocation(text)}
              value={location}
            />
            <Input
              labelStyle={styles.label}
              containerStyle={styles.containerStyle}
              inputContainerStyle={styles.inputContainer}
              inputStyle={styles.input}
              underlineColorAndroid="transparent"
              label="Date and Time"
              onChangeText={text => setDate(text)}
              value={date}
            />
            <Input
              labelStyle={styles.label}
              containerStyle={styles.containerStyle}
              inputContainerStyle={styles.inputContainer}
              inputStyle={styles.input}
              underlineColorAndroid="transparent"
              label="Brief Description"
              onChangeText={text => setDescription(text)}
              value={description}
            />
            <View style={styles.switchContainer}>
              <Text style={styles.label}>Plus One</Text>
              <Switch
                value={plusOne}
                onValueChange={() => setPlusOne(!plusOne)}
                thumbColor={plusOne ? theme.color.secondary : '#f4f3f4'}
                trackColor={{
                  false: '#767577',
                  true: theme.color.secondaryAccent
                }}
              />
            </View>
            <View style={styles.switchContainer}>
              <Text style={styles.label}>Private</Text>
              <Switch
                value={isPrivate}
                onValueChange={() => setPrivate(!isPrivate)}
                thumbColor={isPrivate ? theme.color.secondary : '#f4f3f4'}
                trackColor={{
                  false: '#767577',
                  true: theme.color.secondaryAccent
                }}
              />
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </Fragment>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: theme.color.background
  },
  formContainer: {
    width: '100%',
    // height: '100%',
    backgroundColor: theme.color.backgroundColor,
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
