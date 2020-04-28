import React, { useState, useEffect } from 'react'
import useAuth from '@context/authContext'
import PropTypes from 'prop-types'

import { theme } from '@util'
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Keyboard,
  ImageBackground
} from 'react-native'
import { Spacer, KeyboardDismiss } from '@common'
import AuthSubmit from '@components/auth/AuthSubmit'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const SignupScreen = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [confirmPass, setConfirmPass] = useState('')

  const { register, clearError, authState } = useAuth()

  useEffect(() => {
    if (authState.error) {
      alert(authState.error)
    }
    return clearError()
  }, [authState.error])

  const submitButtonHandler = () => {
    if (name.length <= 0 || username.length <= 0) {
      return alert('Please make sure all fields are filled out')
    }
    if (password !== confirmPass) {
      return alert('Passwords need to match')
    }
    const dob = '03/01/2000' // TODO: Add date of birth to registration?
    register({ email, password, username, dob, name })
  }

  return (
    <ImageBackground
      // eslint-disable-next-line no-undef
      source={require('../../assets/auth-display.png')}
      style={styles.image}
    >
      <KeyboardAwareScrollView
        enableOnAndroid
        contentContainerStyle={styles.keyboardScrollContainer}
      >
        <KeyboardDismiss>
          <View style={styles.containerStyle}>
            <Spacer>
              <Text style={styles.logoPlaceholderStyle}>LNQ</Text>
            </Spacer>

            <Spacer>
              <TextInput
                style={styles.inputStyle}
                placeholder='Name'
                autoCapitalize='none'
                autoCorrect={false}
                value={name}
                onChangeText={setName}
              />
            </Spacer>
            <Spacer>
              <TextInput
                style={styles.inputStyle}
                placeholder='Username'
                autoCapitalize='none'
                autoCorrect={false}
                value={username}
                onChangeText={setUsername}
              />
            </Spacer>
            <Spacer>
              <TextInput
                style={styles.inputStyle}
                placeholder='Email Address'
                autoCapitalize='none'
                autoCorrect={false}
                value={email}
                onChangeText={setEmail}
              />
            </Spacer>
            <Spacer>
              <TextInput
                style={styles.inputStyle}
                placeholder='Password'
                autoCapitalize='none'
                autoCorrect={false}
                value={password}
                onChangeText={setPassword}
              />
            </Spacer>
            <Spacer>
              <TextInput
                style={styles.inputStyle}
                placeholder='Confirm Password'
                autoCapitalize='none'
                autoCorrect={false}
                value={confirmPass}
                onChangeText={setConfirmPass}
              />
            </Spacer>

            <AuthSubmit
              submitButtonTitle='Sign Up'
              navigationRoute='Login'
              routeContent='Have an account already? Sign In Here'
              onSubmit={() => {
                Keyboard.dismiss()
                submitButtonHandler()
              }}
            />
          </View>
        </KeyboardDismiss>
      </KeyboardAwareScrollView>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  keyboardScrollContainer: {
    flexGrow: 1,
    justifyContent: 'center'
  },
  containerStyle: {
    flex: 1,
    justifyContent: 'center',
    marginBottom: 30
  },
  logoPlaceholderStyle: {
    fontWeight: 'bold',
    fontSize: 50,
    alignSelf: 'center',
    color: theme.color.tertiary
  },
  inputStyle: {
    backgroundColor: theme.color.tertiary,
    fontSize: 20,
    padding: 10,
    borderRadius: 20
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    backgroundColor: theme.color.background
  }
})

SignupScreen.propTypes = {
  navigation: PropTypes.object
}

export default SignupScreen
