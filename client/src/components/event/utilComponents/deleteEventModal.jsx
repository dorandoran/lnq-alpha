import React from 'react'
import PropTypes from 'prop-types'

import useDeleteEvent from '@graphql/event/useDeleteEvent'
import useNotification from '@hooks/useNotification'
import useOverlay from '@context/overlayContext'

import { theme } from '@util'
import { StyleSheet, View, Text } from 'react-native'
import { DialogConfirmActions, Loading } from '@common'

const DeleteEventModal = ({ event, modalActions, permissions }) => {
  const { throwSuccess } = useNotification()
  const { dispatch, actions } = useOverlay()
  const [deleteEvent, loading] = useDeleteEvent({
    onCompleted: () => {
      throwSuccess('Event deleted.')
      modalActions.cancelModal()
      dispatch({ type: actions.modal.close })
    }
  })

  const handleConfirm = () => {
    if (permissions.canDeleteEvent) {
      deleteEvent({ id: event.id })
    }
  }

  const handleClose = () => {
    modalActions.cancelModal()
  }

  if (loading) return <Loading backgroundColor='transparent' />

  return (
    <View style={styles.container}>
      <View style={styles.messageContainer}>
        <Text style={styles.message}>
          Are you sure you want to delete this event?
        </Text>
      </View>
      <DialogConfirmActions
        handleConfirm={handleConfirm}
        handleClose={handleClose}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    alignItems: 'center',
    width: '90%',
    backgroundColor: theme.color.accent,
    borderRadius: 25,
    paddingHorizontal: '3%'
  },
  messageContainer: {
    padding: '5%'
  },
  message: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.color.tertiary
  }
})

DeleteEventModal.propTypes = {
  event: PropTypes.object,
  modalActions: PropTypes.object,
  permissions: PropTypes.object
}

export default DeleteEventModal
