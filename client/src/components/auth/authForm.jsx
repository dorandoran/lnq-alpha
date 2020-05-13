import React from 'react'
import PropTypes from 'prop-types'

import { View, StyleSheet } from 'react-native'
import { StyledInput } from '@common'
import { theme } from '@util'
import {
  LoginInputMap,
  SignupInputMap,
  OAuthSignupInputMap
} from '@components/auth/utilComponents/authUtil'

const AuthForm = ({ onFocus, inputState, setInput, screen }) => {
  let inputs =
    screen === 'Login'
      ? LoginInputMap
      : screen === 'Signup'
      ? SignupInputMap
      : OAuthSignupInputMap

  const updateInput = (value, text) => {
    setInput({ ...inputState, [value]: text })
  }

  return (
    <View style={styles.container}>
      {inputs.map(({ label, value }) => {
        return (
          <StyledInput
            onFocus={event => onFocus(event.target)}
            key={value}
            value={inputState[value]}
            onChange={({ nativeEvent }) => updateInput(value, nativeEvent.text)}
            placeholder={label}
            autoCapitalize='none'
            autoCorrect={false}
            secureTextEntry={value === 'password'}
            backgroundColor={theme.color.tertiary}
            color={theme.color.background}
            containerStyle={styles.inputContainer}
          />
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center'
  },
  inputContainer: {
    marginVertical: '1%'
  }
})

AuthForm.propTypes = {
  onFocus: PropTypes.func,
  inputState: PropTypes.object,
  setInput: PropTypes.func,
  screen: PropTypes.string
}

export default AuthForm
