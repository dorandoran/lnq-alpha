import React, { useState, useEffect } from 'react'
import useAuth from '@context/authContext'
import PropTypes from 'prop-types'

import { theme } from '@src/theme'
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Keyboard,
  ImageBackground
} from 'react-native'
import AuthSubmit from '@components/auth/AuthSubmit'
import ResetModal from '@components/auth/ResetModal'
import { Spacer, KeyboardDismiss } from '@common'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { SCREEN_HEIGHT } from '@components/util/constants'

const LoginScreen = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [viewModal, setViewModal] = useState(false)

  const {
    login,
    tryLocalSignIn,
    signInWithGoogleAsync,
    signInWithFacebook,
    clearError,
    authState
  } = useAuth()

  useEffect(() => {
    if (authState.error) {
      alert(authState.error)
    }
    return clearError()
  }, [authState.error])

  /**
   * Attempts to login user on app open
   *   - tryLocalSignIn() returns a function to unsubscribe from onAuthStateChanged
   *   - after attempting to login, the app unsubscribes from the listener
   *     in order to save battery and a constant authState connection
   */

  useEffect(() => {
    let unsubscribe
    async function attemptLogin () {
      unsubscribe = await tryLocalSignIn()
    }

    attemptLogin()
    return () => {
      if (unsubscribe) unsubscribe()
    }
  }, [])

  const resetModalViewHandler = () => {
    setViewModal(!viewModal)
  }

  const cancelModalViewHandler = () => {
    setViewModal(false)
    setPassword('')
  }

  const submitButtonHandler = () => {
    login({ email, password })
  }

  const googleSubmitButtonHandler = () => {
    signInWithGoogleAsync()
  }

  const facebookSubmitButtonHandler = () => {
    signInWithFacebook()
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
        extraHeight={SCREEN_HEIGHT / 7}
      >
        <KeyboardDismiss>
          <View style={styles.containerStyle}>
            {viewModal ? (
              <ResetModal
                isModalShown={viewModal}
                cancelModal={cancelModalViewHandler}
                emailHolder={email}
              />
            ) : null}
            <Text style={styles.welcomeMessageStyle}>Welcome {'\n'}Back</Text>
            <Spacer>
              <Text style={styles.logoPlaceholderStyle}>LNQ</Text>
            </Spacer>
            <Spacer>
              <TextInput
                style={styles.inputStyle}
                autoCorrect={false}
                autoCapitalize='none'
                placeholder='Email'
                value={email}
                onChangeText={setEmail}
              />
            </Spacer>
            <Spacer>
              <TextInput
                style={styles.inputStyle}
                autoCorrect={false}
                autoCapitalize='none'
                placeholder='Password'
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />
            </Spacer>

            <Spacer>
              <TouchableOpacity
                onPress={() => {
                  Keyboard.dismiss()
                  resetModalViewHandler()
                }}
              >
                <Text style={styles.resetStyle}>Reset your Password</Text>
              </TouchableOpacity>
            </Spacer>

            <AuthSubmit
              submitButtonTitle='Login'
              navigationRoute='Signup'
              routeContent='New user? Sign up here'
              onSubmit={() => {
                Keyboard.dismiss()
                submitButtonHandler()
              }}
              onGoogleSubmit={googleSubmitButtonHandler}
              onFacebookSubmit={facebookSubmitButtonHandler}
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
  welcomeMessageStyle: {
    fontWeight: 'bold',
    fontSize: 40,
    color: theme.color.tertiary,
    marginLeft: 20
  },
  inputStyle: {
    backgroundColor: theme.color.tertiary,
    fontSize: 20,
    padding: 10,
    borderRadius: 20
  },
  resetStyle: {
    alignSelf: 'center',
    fontSize: 20,
    color: theme.color.secondary
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    backgroundColor: theme.color.background
  }
})

LoginScreen.propTypes = {
  navigation: PropTypes.object
}

export default LoginScreen
