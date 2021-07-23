import React, { useState, createContext, useContext, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { GetCurrentUser } from '@graphql/user/queries'
import useAuth from '@context/authContext'
import useOverlay from '@context/overlayContext'
import useNotification from '@hooks/useNotification'

import { Loading } from '@common'
import { BUCKET, navigate, getOAuthUserInfo } from '@util'

const UserContext = createContext()

export const UserProvider = props => {
  const [user, setUser] = useState(null)
  const { authState } = useAuth()
  const { dispatch, actions } = useOverlay()
  const { throwSuccess } = useNotification()
  const skip = !authState.userId

  // Get the user data from store
  const { data, loading } = useQuery(GetCurrentUser, {
    onCompleted: res => {
      setUser(res.user)
    },
    skip
  })

  // Google/Facebook first time sign up
  useEffect(() => {
    if (!data?.user && authState.userId) {
      navigate('Signup', {
        oauth: true,
        user: getOAuthUserInfo(authState.user)
      })
    }
  }, [loading])

  useEffect(() => {
    if (user?.id) {
      throwSuccess('Successfully logged in.')
    }

    if (user?.new) {
      dispatch({
        type: actions.modal.open,
        payload: { type: BUCKET.NEW, data: user }
      })
    }
  }, [user?.id])

  useEffect(() => {
    if (data?.user && !authState.authenticated) {
      setUser(null)
    }
  }, [authState.authenticated])

  if (loading) {
    return <Loading fullScreen />
  }

  const updateUserState = userFragment => {
    setUser({ ...user, ...userFragment })
  }

  return <UserContext.Provider value={{ user, updateUserState }} {...props} />
}

const useUser = () => {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider')
  }

  return context
}

export default useUser
