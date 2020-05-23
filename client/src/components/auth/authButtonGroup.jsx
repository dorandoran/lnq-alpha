import React from 'react'
import PropTypes from 'prop-types'

import useAuth from '@context/authContext'
import useNotification from '@hooks/useNotification'
import useOverlay from '@context/overlayContext'

import { View, StyleSheet, TouchableOpacity, Text } from 'react-native'
import { Button } from 'react-native-elements'
import { theme, navigate } from '@util'
import { validateSignup } from '@components/auth/utilComponents/authUtil'

const AuthButtonGroup = ({ input, screen }) => {
  const { login, register, logout, authState } = useAuth()
  const { dispatch, actions } = useOverlay()
  const { throwError } = useNotification()

  const isLogin = screen === 'Login'
  const isOAuth = screen === 'oAuth'
  const submitButtonText = isLogin ? 'Login' : 'Sign Up'
  const userButtonText = isLogin
    ? 'New user? Sign up here'
    : isOAuth
    ? 'Cancel signing up here'
    : 'Have an account already? Sign in here'

  const handleUserPress = () => {
    if (isLogin) {
      navigate('Signup')
    } else if (isOAuth) {
      logout({ hideNotification: true })
    } else {
      navigate('Login')
    }
  }

  const handleSubmit = () => {
    if (isLogin) {
      login(input)
    } else {
      const errors = validateSignup(input, {
        disablePass: isOAuth ? true : false
      })

      if (errors.length) {
        throwError(errors.join('\n'))
      } else {
        register(input)
      }
    }
  }

  const handleResetPass = () => {
    dispatch({ type: actions.dialog.auth.reset })
  }

  return (
    <View style={styles.container}>
      <Button
        containerStyle={styles.buttonContainer}
        buttonStyle={styles.button}
        title={submitButtonText}
        onPress={handleSubmit}
        loading={authState.loading}
      />

      {isLogin && (
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={handleResetPass}
        >
          <Text style={[styles.text, styles.reset]}>Reset your Password</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={handleUserPress}
      >
        <Text style={[styles.text, styles.new]}>{userButtonText}</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center'
  },
  buttonContainer: {
    width: '95%',
    margin: '3%'
  },
  button: {
    borderRadius: 25,
    backgroundColor: theme.color.secondary
  },
  text: {
    alignSelf: 'center',
    fontSize: 20,
    fontWeight: 'bold'
  },
  reset: { color: theme.color.secondary },
  new: { color: theme.color.tertiary }
})

AuthButtonGroup.propTypes = {
  input: PropTypes.object,
  screen: PropTypes.string
}

export default AuthButtonGroup
