import React, { createContext, useState, useContext } from 'react'
import firebase from 'firebase'

const AuthContext = createContext()

const AuthProvider = (props) => {
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
      const response = await firebase.auth().createUserWithEmailAndPassword(email, password)
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
      const response = await firebase.auth().signInWithEmailAndPassword(email, password)
      setIsLoading(false)
      setUser(response.user.uid)
    }
    catch (error) {
      setIsLoading(false)
      setErr(error)
    }
  }

  const passReset = async ({ email }) => {
    try {
      clearErr()
      setIsLoading(true)
      await firebase.auth().sendPasswordResetEmail(email)
      setSuccess(true)
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      setSuccess(false)
      setErr(error)
    }
  }

  return <AuthContext.Provider value={{
    user,
    register,
    login,
    passReset,
    success,
    err,
    isLoading,
    clearErr
  }} {...props} />
}

const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within a AuthProvider')
  }

  return context
}

export { AuthProvider, useAuth }