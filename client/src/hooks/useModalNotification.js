import { useContext, useCallback } from 'react'
import ModalNotificationContext from '@context/modalNotificationContext'

const useNotification = () => {
  const { dispatch } = useContext(ModalNotificationContext)

  const throwLoading = useCallback(
    hideIndicator =>
      dispatch({ type: 'loading', payload: { hideIndicator } }),
    []
  )

  const throwSuccess = useCallback(
    message => dispatch({ type: 'success', payload: { message } }),
    []
  )

  const throwError = useCallback(
    message => dispatch({ type: 'error', payload: { message } }),
    []
  )

  const throwWarning = useCallback(
    message => dispatch({ type: 'warning', payload: { message } }),
    []
  )

  const throwNotification = useCallback(({ message, type }) =>
    dispatch({ type: 'notification', payload: { message, type } })
  )

  const closeNotification = useCallback(() =>
    dispatch({ type: 'closeNotification' })
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
