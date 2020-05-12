import React, { useState, useEffect } from 'react'
import useAuth from '@context/authContext'
import PropTypes from 'prop-types'

import SignupForm from '@components/auth/authForm'
import SignupButtons from '@components/auth/authButtonGroup'
import OAuthButtons from '@components/auth/authOAuthButtons'

import { theme } from '@util'
import { View, Text, StyleSheet, ImageBackground } from 'react-native'
import { Spacer, KeyboardDismiss } from '@common'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const initialState = {
  name: '',
  username: '',
  email: '',
  password: '',
  confirmPass: ''
}

const SignupScreen = () => {
  const [signupInput, setSignupInput] = useState(initialState)

  const { clearError, authState } = useAuth()

  useEffect(() => {
    if (authState.error) {
      alert(authState.error)
    }
    return clearError()
  }, [authState.error])

  // Programmatically scroll to inputs
  const scrollToInput = node => {
    this.scroll.props.scrollToFocusedInput(node)
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
        innerRef={ref => (this.scroll = ref)}
      >
        <KeyboardDismiss>
          <View style={styles.containerStyle}>
            <Spacer>
              <Text style={styles.logoPlaceholderStyle}>LNQ</Text>
            </Spacer>

            <SignupForm
              onFocus={scrollToInput}
              inputState={signupInput}
              setInput={setSignupInput}
              screen='Signup'
            />
            <SignupButtons input={signupInput} screen='Signup' />
            <OAuthButtons />
            {/* <AuthSubmit
              onSubmit={() => {
                Keyboard.dismiss()
                submitButtonHandler()
              }}
            /> */}
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
