import React, { createContext, useContext, useEffect } from 'react'
import useAuth from '@context/authContext'
import useOverlay from '@context/overlayContext'
import useNotification from '@hooks/useNotification'

import { BUCKET } from '@util'

const UserContext = createContext()

export const UserProvider = props => {
  const { data } = useAuth()
  const { dispatch, actions } = useOverlay()
  const { throwSuccess } = useNotification()
  const user = data?.user || null

  useEffect(() => {
    if (user?.id) {
      throwSuccess('Successfully logged in.')
    }
    if (!user?.avatarUrl) {
      dispatch({
        type: actions.modal.open,
        payload: { type: BUCKET.NEW, data: user }
      })
    }
  }, [user])

  return <UserContext.Provider value={user} {...props} />
}

const useUser = () => {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider')
  }

  return context
}

export default useUser
