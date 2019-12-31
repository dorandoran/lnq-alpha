import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { View, Text, StyleSheet, TextInput, Keyboard } from 'react-native'
import Spacer from '@common/Spacer'
import AuthSubmit from '@auth/AuthSubmit'
import { useAuth } from '@context/auth-context'
import KeyboardDismiss from '@common/keyboardDismiss'

const SignupScreen = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [confirmPass, setConfirmPass] = useState('')

  const { register, err, clearErr } = useAuth()

  useEffect(() => {
    if (err) {
      alert(err)
    }
    return clearErr()
  }, [err])

  const submitButtonHandler = () => {
    if (name.length <= 0 || username.length <= 0) {
      return alert('Please make sure all fields are filled out')
    }
    if (password !== confirmPass) {
      return alert('Passwords need to match')
    }
    register({ email, password, username })
  }

  return (
    <KeyboardDismiss>
      <View style={styles.containerStyle}>
        <Spacer>
          <Text
            style={styles.logoPlaceholderStyle}
          >
			LNQ
          </Text>
        </Spacer>

        <Spacer>
          <TextInput
            style={styles.inputStyle}
            placeholder="Name"
            autoCapitalize="none"
            autoCorrect={false}
            value={name}
            onChangeText={setName}
          />
        </Spacer>
        <Spacer>
          <TextInput
            style={styles.inputStyle}
            placeholder="Username"
            autoCapitalize="none"
            autoCorrect={false}
            value={username} 
            onChangeText={setUsername}
          />
        </Spacer>
        <Spacer>
          <TextInput
            style={styles.inputStyle}
            placeholder="Email Address"
            autoCapitalize="none"
            autoCorrect={false}
            value={email}
            onChangeText={setEmail}
          />
        </Spacer>
        <Spacer>
          <TextInput
            style={styles.inputStyle}
            placeholder="Password"
            autoCapitalize="none"
            autoCorrect={false}
            value={password}
            onChangeText={setPassword}
          />
        </Spacer>
        <Spacer>
          <TextInput
            style={styles.inputStyle}
            placeholder="Confirm Password"
            autoCapitalize="none"
            autoCorrect={false}
            value={confirmPass}
            onChangeText={setConfirmPass}
          />
        </Spacer>

        <AuthSubmit
          submitButtonTitle="Sign Up"
          navigationRoute="Login"
          routeContent="Have an account already? Sign In Here"
          onSubmit={() => {
            Keyboard.dismiss()
            submitButtonHandler()
          }}
        />
      </View>
    </KeyboardDismiss>
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

SignupScreen.propTypes = {
  navigation: PropTypes.object
}

export default SignupScreen
