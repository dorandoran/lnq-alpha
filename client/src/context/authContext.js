import React, { createContext, useContext, useReducer } from 'react'
import * as Google from 'expo-google-app-auth'
import * as Facebook from 'expo-facebook'
import { f, auth } from '@services/firebase'
import config from '@config'

import useNotification from '@hooks/useNotification'
import { useQuery } from '@apollo/react-hooks'
import { GetUser } from '@graphql/user/queries'
import useCreateUser from '@graphql/user/useCreateUser'

import { Loading } from '@common'
import { navigate, resetNavigate, getOAuthUserInfo } from '@util'

const actions = {
  reset: 'resetAuth',
  registerUser: 'registerUser',
  clearError: 'clearError',
  startLoading: 'startLoading',
  stopLoading: 'stopLoading',
  loginSuccess: 'loginSuccess',
  loginOAuthSuccess: 'loginOAuthSuccess',
  loginFacebookSuccess: 'loginFacebookSuccess',
  loginError: 'loginError',
  logout: 'logout',
  resetEmailSuccess: 'resetEmailSuccess'
}

const initialState = {
  loading: false,
  error: '',
  userId: null,
  user: null,
  resetEmailSent: false
}

function reducer (state, action) {
  switch (action.type) {
    case actions.reset:
      return initialState
    case actions.clearError:
      return { ...state, error: '' }
    case actions.startLoading:
      return { ...state, loading: true, error: '' }
    case actions.stopLoading:
      return { ...state, loading: false }
    case actions.loginSuccess:
      return { ...state, loading: false, userId: action.payload }
    case actions.loginOAuthSuccess:
      return {
        ...state,
        loading: false,
        userId: action.payload.uid,
        user: action.payload
      }
    case actions.loginError:
      return { ...state, loading: false, error: action.payload }
    case actions.logout:
      return { ...state, userId: null }
    case actions.resetEmailSuccess:
      return { ...state, loading: false, resetEmailSent: true }
    default:
      throw new Error('Something went wrong with the auth context.')
  }
}

const AuthContext = createContext()

export const AuthProvider = props => {
  const [authState, dispatch] = useReducer(reducer, initialState)
  const { throwSuccess, throwWarning, throwError } = useNotification()
  const [createUser, createLoading] = useCreateUser({
    onCompleted: ({ id }) => {
      dispatch({ type: actions.loginSuccess, payload: id })
    }
  })
  const skip = !authState.userId || createLoading

  // Get the user data from store
  const { data, loading } = useQuery(GetUser, {
    variables: { id: authState.userId },
    skip
  })

  if (loading || createLoading) {
    return <Loading fullScreen />
  }

  // Google/Facebook first time sign up
  if (authState.userId && !data?.user) {
    navigate('Signup', {
      oauth: true,
      user: getOAuthUserInfo(authState.user)
    })
  }

  // Auth Actions
  const reset = () => {
    resetNavigate({ index: 0, routes: [{ name: 'Login' }, { name: 'Signup' }] })
    dispatch({ type: actions.reset })
  }

  const clearError = () => {
    dispatch({ type: actions.clearError })
  }

  const register = async ({ email, password, username, name, dob, id }) => {
    // First time OAuth Users will have an id, but not saved to database
    // register will be passed in id in this situation
    let _id = id
    try {
      if (password) {
        dispatch({ type: actions.startLoading })
        const response = await auth.createUserWithEmailAndPassword(
          email,
          password
        )
        _id = response.user.uid
      }

      // Dispatch is placed within createUser above
      createUser({ email, username, name, dob, id: _id })
    } catch (error) {
      throwError(error.message)
      dispatch({ type: actions.loginError, payload: error })
    }
  }

  const login = async ({ email, password }) => {
    try {
      dispatch({ type: actions.startLoading })
      const response = await auth.signInWithEmailAndPassword(email, password)
      const id = response.user.uid
      dispatch({ type: actions.loginSuccess, payload: id })
    } catch (error) {
      throwError(error.message)
      dispatch({ type: actions.loginError, payload: error })
    }
  }

  const tryLocalSignIn = async () => {
    dispatch({ type: actions.startLoading })
    const unsubscribe = auth.onAuthStateChanged(async user => {
      if (user) {
        const id = user.uid
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
        dispatch({ type: actions.loginOAuthSuccess, payload: response.user })
      }
    } catch (error) {
      throwError(error.message)
      dispatch({ type: actions.loginError, payload: error })
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
        dispatch({ type: actions.loginOAuthSuccess, payload: response.user })
      }
    } catch (error) {
      throwError(error.message)
      dispatch({ type: actions.loginError, payload: error })
    }
  }

  const logout = async options => {
    auth
      .signOut()
      .then(() => {
        dispatch({ type: actions.logout })
        if (!options?.hideNotification) throwWarning('Logged out.')
        navigate('Login')
      })
      .catch(error => {
        throwError(error.message)
        dispatch({ type: actions.loginError, payload: error })
      })
  }

  const resetPassword = async ({ email, onComplete }) => {
    try {
      dispatch({ type: actions.startLoading })
      await auth.sendPasswordResetEmail(email)
      throwSuccess('Email sent! Check to reset password.')
      if (onComplete) onComplete()
      dispatch({ type: actions.resetEmailSuccess })
    } catch (error) {
      throwError(error.message)
      dispatch({ type: actions.loginError, payload: error })
    }
  }

  return (
    <AuthContext.Provider
      value={{
        data,
        authState,
        register,
        login,
        tryLocalSignIn,
        signInWithGoogleAsync,
        signInWithFacebook,
        logout,
        resetPassword,
        clearError,
        reset
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
