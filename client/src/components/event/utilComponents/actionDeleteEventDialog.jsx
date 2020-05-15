import React, { Fragment } from 'react'

import useDeleteEvent from '@graphql/event/useDeleteEvent'
import useNotification from '@hooks/useNotification'
import useOverlay from '@context/overlayContext'

import LoadingDialog from '@components/overlay/loadingDialog'

import { theme } from '@util'
import { StyleSheet, View, Text } from 'react-native'
import { DialogConfirmActions } from '@common'

const ActionDeleteEventDialog = () => {
  const {
    dispatch,
    actions,
    modal: { data }
  } = useOverlay()
  const { throwSuccess } = useNotification()
  const [deleteEvent, loading] = useDeleteEvent({
    onComplete: () => {
      throwSuccess('Event deleted.')
      handleClose()
    }
  })

  const handleConfirm = () => {
    deleteEvent({ id: data.id })
  }

  const handleClose = () => {
    dispatch({ type: actions.modal.close })
  }

  if (loading) return <LoadingDialog />

  return (
    <Fragment>
      <View style={styles.messageContainer}>
        <Text style={styles.message}>
          Are you sure you want to delete this event?
        </Text>
      </View>
      <DialogConfirmActions
        handleConfirm={handleConfirm}
        handleClose={handleClose}
      />
    </Fragment>
  )
}

const styles = StyleSheet.create({
  messageContainer: {
    padding: '5%'
  },
  message: {
    textAlign: 'center',
    fontSize: 24,
    color: theme.color.tertiary
  },
  subMessage: {
    textAlign: 'center',
    fontSize: 16,
    color: theme.color.tertiary
  }
})

export default ActionDeleteEventDialog
