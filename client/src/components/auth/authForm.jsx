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

const AuthForm = ({ inputState, setInput, screen }) => {
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
        const secureTextEntry = ['password', 'confirmPass'].includes(value)

        return (
          <StyledInput
            key={value}
            value={inputState[value]}
            onChange={({ nativeEvent }) => updateInput(value, nativeEvent.text)}
            placeholder={label}
            autoCapitalize='none'
            autoCorrect={false}
            secureTextEntry={secureTextEntry}
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
  inputState: PropTypes.object,
  setInput: PropTypes.func,
  screen: PropTypes.string
}

export default AuthForm
