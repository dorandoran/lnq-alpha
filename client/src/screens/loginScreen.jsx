import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Keyboard } from 'react-native'
import AuthSubmit from '@auth/AuthSubmit'
import Spacer from '@common/Spacer'
import { useAuth } from '@context/auth-context'
import ResetModal from '@auth/ResetModal'
import KeyboardDismiss from '@common/keyboardDismiss'

const LoginScreen = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [viewModal, setViewModal] = useState(false)

  const { login, err, clearErr } = useAuth()

  useEffect(() => {
    if (err) {
      alert(err)
    }
    return clearErr()
  }, [err])

  const resetModalViewHandler = () => {
    setViewModal(!viewModal)
  }

  const cancelModalViewHandler = () => {
    setViewModal(false)
    setPassword('')
  }

  const submitButtonHandler = () => {
    login({ email, password })
  }

  return (
    <KeyboardDismiss>
      <View style={styles.containerStyle}>
        {viewModal ? <ResetModal
          isModalShown={viewModal}
          cancelModal={cancelModalViewHandler}
          emailHolder={email}
        /> : null}
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

        <Spacer>
          <TouchableOpacity onPress={() => {
            Keyboard.dismiss()
            resetModalViewHandler()
          }}>
            <Text style={styles.resetStyle}>Reset your Password</Text>
          </TouchableOpacity>
        </Spacer>

        <AuthSubmit
          submitButtonTitle="Login"
          navigationRoute="Signup"
          routeContent="New user? Sign up here"
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
  },
  resetStyle: {
    alignSelf: 'center',
    fontSize: 20,
    color: '#BE0000'
  }
})

LoginScreen.propTypes = {
  navigation: PropTypes.object
}

export default LoginScreen