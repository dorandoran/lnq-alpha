import React, { createContext, useState, useContext } from 'react'
import { auth } from '@services/firebase'
import * as Google from 'expo-google-app-auth'
import * as Facebook from 'expo-facebook'

const AuthContext = createContext()

const AuthProvider = props => {
  const [isLoading, setIsLoading] = useState(false)
  const [err, setErr] = useState('')
  const [user, setUser] = useState('')
  const [success, setSuccess] = useState(false)

  const clearErr = () => {
    setErr('')
  }

  const register = async ({ email, password, username }) => {
    try {
      clearErr()
      setIsLoading(true)
      const response = await auth.createUserWithEmailAndPassword(
        email,
        password
      )
      await response.user.updateProfile({ displayName: username })
      setIsLoading(false)
      setUser(response.user.uid)
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
        androidClientId:
          '650252507366-1mb3kjm7qtb42mnc7ktnop1qgvb37tpi.apps.googleusercontent.com',
        iosClientId:
          '650252507366-a7r20o66k8jqekuajbmkcr6vjpairhsp.apps.googleusercontent.com',
        scopes: ['profile', 'email']
      })
      if (result.type === 'success') {
        setUser(result.user.id)
        return result.accessToken
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
      await Facebook.initializeAsync('880713082385563')
      const { type, token } = await Facebook.logInWithReadPermissionsAsync({
        permissions: ['email', 'public_profile']
      })
      if (type === 'success') {
        // Get the user's name using Facebook's Graph API
        const response = await fetch(
          `https://graph.facebook.com/me?access_token=${token}`
        )
        const userInfo = await response.json()
        setUser(userInfo.id)
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
