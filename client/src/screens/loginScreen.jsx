import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import useAuth from '@context/authContext'

import LoginForm from '@components/auth/authForm'
import LoginButtons from '@components/auth/authButtonGroup'
import OAuthButtons from '@components/auth/authOAuthButtons'

import { theme } from '@util'
import { View, Text, StyleSheet, ImageBackground } from 'react-native'
import { Spacer, KeyboardDismiss } from '@common'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const initialState = {
  email: '',
  password: ''
}

const LoginScreen = () => {
  const [loginInput, setLoginInput] = useState(initialState)
  const { tryLocalSignIn } = useAuth()

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

  // Programmatically scroll to inputs
  const scrollToInput = node => {
    this.loginScroll.props.scrollToFocusedInput(node)
  }

  return (
    <ImageBackground
      // eslint-disable-next-line no-undef
      source={require('../../assets/auth-display.png')}
      style={styles.image}
    >
      <KeyboardAwareScrollView
        enableOnAndroid
        contentContainerStyle={styles.awareContainer}
        innerRef={ref => (this.loginScroll = ref)}
      >
        <KeyboardDismiss>
          <View style={styles.container}>
            <Text style={styles.welcome}>Welcome {'\n'}Back</Text>
            <Spacer>
              <Text style={styles.logoPlaceholderStyle}>LNQ</Text>
            </Spacer>
            <LoginForm
              onFocus={scrollToInput}
              inputState={loginInput}
              setInput={setLoginInput}
              screen='Login'
            />
            <LoginButtons input={loginInput} screen='Login' />
            <OAuthButtons />
          </View>
        </KeyboardDismiss>
      </KeyboardAwareScrollView>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  awareContainer: {
    flexGrow: 1,
    justifyContent: 'center'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    marginBottom: '8%'
  },
  logoPlaceholderStyle: {
    fontWeight: 'bold',
    fontSize: 50,
    alignSelf: 'center',
    color: theme.color.tertiary
  },
  welcome: {
    fontWeight: 'bold',
    fontSize: 40,
    color: theme.color.tertiary,
    marginLeft: 20
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
