import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { View, Text, StyleSheet, TextInput } from 'react-native'
import AuthSubmit from '@auth/AuthSubmit'
import Spacer from '@common/Spacer'
import { useAuth } from '@context/auth-context'

const LoginScreen = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { login, err, clearErr } = useAuth()

  useEffect(() => {
    if (err) {
      alert(err)
    }
    return clearErr()
  }, [err])

  const submitButtonHandler = () => {
    login({ email, password })
  }

  return (
    <View style={styles.containerStyle}>
      <Spacer>
        <Text style={styles.logoPlaceholderStyle}>LNQ</Text>
      </Spacer>
      <Spacer>
        <TextInput
          style={styles.inputStyle}
          autoCorrect={false}
          autoCapitalize="none"
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
      </Spacer>
      <Spacer>
        <TextInput
          style={styles.inputStyle}
          autoCorrect={false}
          autoCapitalize="none"
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
      </Spacer>
      <AuthSubmit
        submitButtonTitle="Login"
        navigationRoute="Signup"
        routeContent="New user? Sign up here"
        onSubmit={submitButtonHandler}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    justifyContent: 'center',
    marginBottom: 30
  },
  logoPlaceholderStyle: {
    fontWeight: 'bold',
    fontSize: 50,
    alignSelf: 'center'
  },
  inputStyle: {
    backgroundColor: '#eee',
    fontSize: 20,
    padding: 10,
    borderRadius: 8
  }
})

LoginScreen.propTypes = {
  navigation: PropTypes.object
}

export default LoginScreen