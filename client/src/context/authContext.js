import React, { createContext, useContext, useReducer } from 'react'
import * as Google from 'expo-google-app-auth'
import * as Facebook from 'expo-facebook'

import config from '@config'
import { f, auth } from '@services/firebase'
import useNotification from '@hooks/useNotification'
import useCreateUser from '@graphql/user/useCreateUser'
import { navigate } from '@util'

const actions = {
  registerUser: 'registerUser',
  clearError: 'clearError',
  startLoading: 'startLoading',
  stopLoading: 'stopLoading',
  loginSuccess: 'loginSuccess',
  loginError: 'loginError',
  logout: 'logout',
  resetEmailSuccess: 'resetEmailSuccess',
  resetEmailError: 'resetEmailError'
}

const initialState = {
  loading: false,
  error: '',
  user: null,
  resetEmailSent: false
}

function reducer (state, action) {
  switch (action.type) {
    case actions.clearError:
      return { ...state, error: '' }
    case actions.startLoading:
      return { ...state, loading: true, error: '' }
    case actions.stopLoading:
      return { ...state, loading: false }
    case actions.loginSuccess:
      return { ...state, loading: false, user: action.payload }
    case actions.loginError:
      return { ...state, loading: false, error: action.payload }
    case actions.logout:
      return { ...state, user: null }
    case actions.resetEmailSuccess:
      return { ...state, loading: false, resetEmailSent: true }
    case actions.resetEmailError:
      return {
        ...state,
        loading: false,
        resetEmailSent: false,
        error: action.payload
      }
    default:
      // TODO: Error Handling
      throw new Error()
  }
}

const AuthContext = createContext()

export const AuthProvider = props => {
  const [authState, dispatch] = useReducer(reducer, initialState)
  const { throwSuccess, throwWarning } = useNotification()
  const createUser = useCreateUser()

  const clearError = () => {
    dispatch({ type: actions.clearError })
  }

  const register = async ({ email, password, username, name, dob }) => {
    try {
      dispatch({ type: actions.startLoading })
      const response = await auth.createUserWithEmailAndPassword(
        email,
        password
      )
      await response.user.updateProfile({ displayName: username })
      const id = response.user.uid

      createUser({ email, username, name, dob, id })
      throwSuccess('Successfully logged in.')
      dispatch({ type: actions.loginSuccess, payload: id })
    } catch (error) {
      dispatch({ type: actions.loginError, payload: error })
    }
  }

  const login = async ({ email, password }) => {
    try {
      dispatch({ type: actions.startLoading })
      const response = await auth.signInWithEmailAndPassword(email, password)
      const id = response.user.uid

      throwSuccess('Successfully logged in.')
      dispatch({ type: actions.loginSuccess, payload: id })
    } catch (error) {
      dispatch({ type: actions.loginError, payload: error })
    }
  }

  const tryLocalSignIn = async () => {
    dispatch({ type: actions.startLoading })
    const unsubscribe = auth.onAuthStateChanged(async user => {
      if (user) {
        const id = user.uid
        throwSuccess('Successfully logged in.')
        dispatch({ type: actions.loginSuccess, payload: id })
      }
      dispatch({ type: actions.stopLoading })
    })
    return unsubscribe
  }

  const signInWithGoogleAsync = async () => {
    try {
      const result = await Google.logInAsync({
        androidClientId: config.GOOGLE.ASYNC_ANDROID_CLIENT_ID,
        iosClientId: config.GOOGLE.ASYNC_IOS_CLIENT_ID,
        scopes: ['profile', 'email']
      })
      if (result.type === 'success') {
        const credential = await f.auth.GoogleAuthProvider.credential(
          result.idToken
        )
        const response = await auth.signInWithCredential(credential)

        const id = response.user.uid
        throwSuccess('Successfully logged in.')
        dispatch({ type: actions.loginSuccess, payload: id })
      } else {
        return { cancelled: true }
      }
    } catch (e) {
      console.log('error with login', e)
      return { error: true }
    }
  }

  const signInWithFacebook = async () => {
    try {
      await Facebook.initializeAsync(config.FACEBOOK_ASYNC_ID)
      const {
        type,
        token: fbToken
      } = await Facebook.logInWithReadPermissionsAsync({
        permissions: ['email', 'public_profile']
      })
      if (type === 'success') {
        // Get the user's name using Facebook's Graph API
        const credential = await f.auth.FacebookAuthProvider.credential(fbToken)
        const response = await auth.signInWithCredential(credential)
        const id = response.user.uid
        throwSuccess('Successfully logged in.')
        dispatch({ type: actions.loginSuccess, payload: id })
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`)
    }
  }

  const logout = async () => {
    auth
      .signOut()
      .then(() => {
        dispatch({ type: actions.logout })
        throwWarning('Logged out.')
        navigate('Login')
      })
      .catch(e => {
        // TODO: Error Handling
        console.log(e)
      })
  }

  const resetPassword = async ({ email }) => {
    try {
      dispatch({ type: actions.startLoading })
      await auth.sendPasswordResetEmail(email)
      throwSuccess('Email sent!')
      dispatch({ type: actions.resetEmailSuccess })
    } catch (error) {
      dispatch({ type: actions.resetEmailError, payload: error })
    }
  }

  return (
    <AuthContext.Provider
      value={{
        authState,
        register,
        login,
        tryLocalSignIn,
        signInWithGoogleAsync,
        signInWithFacebook,
        logout,
        resetPassword,
        clearError
      }}
      {...props}
    />
  )
}

const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within a AuthProvider')
  }
  return context
}

export default useAuth
