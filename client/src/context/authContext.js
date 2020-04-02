import React, { createContext, useState, useContext } from 'react'
import config from '@config'
import { auth } from '@services/firebase'
import * as Google from 'expo-google-app-auth'
import * as Facebook from 'expo-facebook'
import { f } from '@services/firebase'
import useCreateUser from '@hooks/useCreateUser'

const AuthContext = createContext()

const AuthProvider = props => {
  const [isLoading, setIsLoading] = useState(false)
  const [err, setErr] = useState('')
  const [user, setUser] = useState('')
  const [success, setSuccess] = useState(false)
  const createUser = useCreateUser()

  const clearErr = () => {
    setErr('')
  }

  const register = async ({ email, password, username, name, dob }) => {
    try {
      clearErr()
      setIsLoading(true)

      const response = await auth.createUserWithEmailAndPassword(
        email,
        password
      )
      await response.user.updateProfile({ displayName: username })
      const id = response.user.uid
      createUser({ email, username, name, dob, id })

      setIsLoading(false)
      setUser(id)
    } catch (error) {
      setIsLoading(false)
      setErr(error)
    }
  }

  const login = async ({ email, password }) => {
    try {
      clearErr()
      setIsLoading(true)
      const response = await auth.signInWithEmailAndPassword(email, password)
      setIsLoading(false)
      setUser(response.user.uid)
    } catch (error) {
      setIsLoading(false)
      setErr(error)
    }
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
        setUser(response.user.uid)
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
      const { type, token } = await Facebook.logInWithReadPermissionsAsync({
        permissions: ['email', 'public_profile']
      })
      if (type === 'success') {
        // Get the user's name using Facebook's Graph API
        const credential = await f.auth.FacebookAuthProvider.credential(token)
        const response = await auth.signInWithCredential(credential)
        setUser(response.user.uid)
      } else {
        // type === 'cancel'
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`)
    }
  }

  const passReset = async ({ email }) => {
    try {
      clearErr()
      setIsLoading(true)
      await auth.sendPasswordResetEmail(email)
      setSuccess(true)
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      setSuccess(false)
      setErr(error)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        register,
        login,
        signInWithGoogleAsync,
        signInWithFacebook,
        passReset,
        success,
        err,
        isLoading,
        clearErr
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

export { AuthProvider, useAuth }
