import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { theme } from '@util'
import { View, StyleSheet } from 'react-native'
import { StyledInput } from '@common'

const inputMap = [
  {
    label: 'Email',
    value: 'email'
  },
  {
    label: 'Password',
    value: 'password'
  }
]

const initialState = {
  email: '',
  password: ''
}

const AuthForm = ({ onFocus }) => {
  const [loginInput, setLoginInput] = useState(initialState)

  const updateInput = (value, text) => {
    setLoginInput({ ...loginInput, [value]: text })
  }

  return (
    <View style={styles.container}>
      {inputMap.map(({ label, value }) => {
        return (
          <StyledInput
            onFocus={event => onFocus(event.target)}
            key={value}
            value={loginInput[value]}
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
  onFocus: PropTypes.func
}

export default AuthForm
