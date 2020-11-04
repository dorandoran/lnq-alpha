import React from 'react'
import PropTypes from 'prop-types'

import useDeleteMedia from '@graphql/media/useDeleteMedia'
import useNotification from '@hooks/useNotification'

import { theme, BUCKET } from '@util'
import { StyleSheet, View, Text } from 'react-native'
import { DialogConfirmActions, Loading } from '@common'

const DeleteMediaModal = ({ event, media, modalActions }) => {
  const { throwSuccess } = useNotification()
  const [deleteMedia, loading] = useDeleteMedia({
    onCompleted: () => {
      throwSuccess('Image successfully deleted.')
      modalActions.cancelModal()
    }
  })

  if (loading) return <Loading backgroundColor='transparent' />

  const handleConfirm = () => {
    deleteMedia({ id: media.id, linkId: event.id, type: BUCKET.EVENT })
  }

  const handleClose = () => {
    modalActions.cancelModal()
  }

  return (
    <View style={styles.container}>
      <View style={styles.messageContainer}>
        <Text style={styles.message}>
          Are you sure you want to delete this image?
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

DeleteMediaModal.propTypes = {
  event: PropTypes.object,
  media: PropTypes.object,
  modalActions: PropTypes.object
}

export default DeleteMediaModal
