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
  const userId = user?.id || null

  useEffect(() => {
    if (userId) {
      throwSuccess('Successfully logged in.')
    }

    if (user?.new) {
      dispatch({
        type: actions.modal.open,
        payload: { type: BUCKET.NEW, data: user }
      })
    }
  }, [userId])

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
