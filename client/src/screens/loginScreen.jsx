import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Keyboard,
  ImageBackground,
  Dimensions
} from 'react-native'
import AuthSubmit from '@components/auth/AuthSubmit'
import ResetModal from '@components/auth/ResetModal'
import Spacer from '@common/Spacer'
import { useAuth } from '@context/authContext'
import KeyboardDismiss from '@common/keyboardDismiss'
import { theme } from '@src/theme'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const LoginScreen = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [viewModal, setViewModal] = useState(false)

  const {
    login,
    signInWithGoogleAsync,
    signInWithFacebook,
    err,
    clearErr
  } = useAuth()

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

  const googleSubmitButtonHandler = () => {
    signInWithGoogleAsync()
  }

  const facebookSubmitButtonHandler = () => {
    signInWithFacebook()
  }

  return (
    <ImageBackground
      source={require('../../assets/auth-display.png')}
      style={styles.image}
    >
      <KeyboardAwareScrollView
        enableOnAndroid
        contentContainerStyle={styles.keyboardScrollContainer}
      >
        <KeyboardDismiss>
          <View style={styles.containerStyle}>
            {viewModal ? (
              <ResetModal
                isModalShown={viewModal}
                cancelModal={cancelModalViewHandler}
                emailHolder={email}
              />
            ) : null}
            <Text style={styles.welcomeMessageStyle}>Welcome {'\n'}Back</Text>
            <Spacer>
              <Text style={styles.logoPlaceholderStyle}>LNQ</Text>
            </Spacer>
            <Spacer>
              <TextInput
                style={styles.inputStyle}
                autoCorrect={false}
                autoCapitalize='none'
                placeholder='Email'
                value={email}
                onChangeText={setEmail}
              />
            </Spacer>
            <Spacer>
              <TextInput
                style={styles.inputStyle}
                autoCorrect={false}
                autoCapitalize='none'
                placeholder='Password'
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />
            </Spacer>

            <Spacer>
              <TouchableOpacity
                onPress={() => {
                  Keyboard.dismiss()
                  resetModalViewHandler()
                }}
              >
                <Text style={styles.resetStyle}>Reset your Password</Text>
              </TouchableOpacity>
            </Spacer>

            <AuthSubmit
              submitButtonTitle='Login'
              navigationRoute='Signup'
              routeContent='New user? Sign up here'
              onSubmit={() => {
                Keyboard.dismiss()
                submitButtonHandler()
              }}
              onGoogleSubmit={googleSubmitButtonHandler}
              onFacebookSubmit={facebookSubmitButtonHandler}
            />
          </View>
        </KeyboardDismiss>
      </KeyboardAwareScrollView>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  keyboardScrollContainer: {
    flex: Math.round(Dimensions.get('window').height) > 640 ? 1 : null,
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
  welcomeMessageStyle: {
    fontWeight: 'bold',
    fontSize: 40,
    color: theme.color.tertiary,
    marginLeft: 20
  },
  inputStyle: {
    backgroundColor: theme.color.tertiary,
    fontSize: 20,
    padding: 10,
    borderRadius: 20
  },
  resetStyle: {
    alignSelf: 'center',
    fontSize: 20,
    color: theme.color.secondary
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    backgroundColor: theme.color.background
  }
})

LoginScreen.propTypes = {
  navigation: PropTypes.object
}

export default LoginScreen
