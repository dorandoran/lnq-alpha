import React, { useState, useContext, useEffect } from 'react'
import PropTypes from 'prop-types'
import { View, Text, StyleSheet, TextInput } from 'react-native'
import Spacer from '../components/Spacer'
import AuthSubmit from '../components/AuthSubmit'
import { Context as AuthContext } from '../context/AuthContext'

const SignupScreen = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [confirmPass, setConfirmPass] = useState('')

  const { state, signup, getCurrentUserInfo, passwordValidation, clearErrorMessage } = useContext(AuthContext)

  useEffect(() => {
    if (state.errorMessage) {
      alert(state.errorMessage)
    }

    // error cleanup
    return clearErrorMessage()
  }, [state.errorMessage])

  const submitButtonHandler = () => {
	  passwordValidation({ password, confirmPass })
	  if (name.length <= 0 || username.length <= 0) {
		return alert('Please make sure all fields are filled out')
	  }
	  if (password === confirmPass) {
		signup({ email, password })
	  }
  }

  // stores user name and username in global state for future use
  useEffect(() => {
    getCurrentUserInfo({ name, username })
  }, [name, username])

  return (
    <View style={styles.containerStyle}>
      <Spacer>
        <Text
          style={{ fontWeight: 'bold', fontSize: 50, alignSelf: 'center' }}
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
