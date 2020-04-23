import { useContext, useCallback } from 'react'
import NotificationContext from '@context/notificationContext'

const useNotification = () => {
  const { notificationDispatch } = useContext(NotificationContext)

  const throwLoading = useCallback(
    () => notificationDispatch({ type: 'loading' }),
    []
  )

  const throwSuccess = useCallback(
    message => notificationDispatch({ type: 'success', payload: { message } }),
    []
  )

  const throwError = useCallback(
    message => notificationDispatch({ type: 'error', payload: { message } }),
    []
  )

  const throwWarning = useCallback(
    message => notificationDispatch({ type: 'warning', payload: { message } }),
    []
  )

  const throwNotification = useCallback(({ message, type }) =>
    notificationDispatch({ type: 'notification', payload: { message, type } })
  )

  return {
    throwLoading,
    throwSuccess,
    throwError,
    throwWarning,
    throwNotification
  }
}

export default useNotification
