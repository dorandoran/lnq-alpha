import { useContext, useCallback } from 'react'
import NotificationContext from '@context/notificationContext'

const useNotification = () => {
  const { notificationDispatch } = useContext(NotificationContext)

  const throwLoading = useCallback(
    hideIndicator =>
      notificationDispatch({ type: 'loading', payload: { hideIndicator } }),
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

  const closeNotification = useCallback(() =>
    notificationDispatch({ type: 'closeNotification' })
  )

  return {
    throwLoading,
    throwSuccess,
    throwError,
    throwWarning,
    throwNotification,
    closeNotification
  }
}

export default useNotification
