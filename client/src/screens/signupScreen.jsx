import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import SignupForm from '@components/auth/authForm'
import SignupButtons from '@components/auth/authButtonGroup'
import OAuthButtons from '@components/auth/authOAuthButtons'

import { View, Text, StyleSheet, ImageBackground } from 'react-native'
import { Spacer, KeyboardDismiss } from '@common'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { theme, PLACEHOLDER_18_YRS } from '@util'

const initialState = {
  name: '',
  username: '',
  email: '',
  password: '',
  confirmPass: '',
  dob: PLACEHOLDER_18_YRS
}

const SignupScreen = ({ route }) => {
  const user = route.params?.user || {}
  const [signupInput, setSignupInput] = useState({ ...initialState, ...user })
  const isOAuthForm = route.params?.oauth || null
  const screen = route.params?.oauth ? 'oAuth' : 'Signup'

  useEffect(() => {
    const user = route.params?.user || {}
    if (user.id) {
      setSignupInput({ ...initialState, ...user })
    }
  }, [route.params])

  // Programmatically scroll to inputs
  const scrollToInput = node => {
    this.signupScroll.props.scrollToFocusedInput(node)
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
        innerRef={ref => (this.signupScroll = ref)}
      >
        <KeyboardDismiss>
          <View style={styles.container}>
            <Spacer>
              {isOAuthForm ? (
                <Text style={styles.oauth}>Almost done....</Text>
              ) : (
                <Text style={styles.logoPlaceholderStyle}>LNQ</Text>
              )}
            </Spacer>

            <SignupForm
              onFocus={scrollToInput}
              inputState={signupInput}
              setInput={setSignupInput}
              screen={screen}
            />
            <SignupButtons input={signupInput} screen={screen} />
            <OAuthButtons screen={screen} />
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
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    backgroundColor: theme.color.background
  },
  oauth: {
    color: theme.color.tertiary,
    fontSize: 25,
    fontWeight: 'bold',
    alignSelf: 'center'
  }
})

SignupScreen.propTypes = {
  route: PropTypes.object
}

export default SignupScreen
