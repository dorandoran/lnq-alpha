import React from 'react'
import PropTypes from 'prop-types'

import useChangeAvatar from '@graphql/event/useChangeAvatar'
import useModalNotification from '@hooks/useModalNotification'

import { theme } from '@util'
import { StyleSheet, View, Text } from 'react-native'
import { DialogConfirmActions, Loading } from '@common'

const ChangeFeatureModal = ({ event, media, modalActions }) => {
  const { throwSuccess } = useModalNotification()
  const [changeAvatar, loading] = useChangeAvatar({
    onCompleted: () => {
      throwSuccess('Feature image successfully changed')
      modalActions.cancelModal()
    }
  })

  if (loading) return <Loading backgroundColor='transparent' />

  const handleConfirm = () => {
    const avatar = {
      id: media.id,
      uri: media.uri
    }
    changeAvatar({ id: event.id, avatar })
  }

  const handleClose = () => {
    modalActions.cancelModal()
  }

  return (
    <View style={styles.container}>
      <View style={styles.messageContainer}>
        <Text style={styles.message}>Use current as featured image?</Text>
      </View>
      <DialogConfirmActions
        handleClose={handleClose}
        handleConfirm={handleConfirm}
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

ChangeFeatureModal.propTypes = {
  event: PropTypes.object,
  media: PropTypes.object,
  modalActions: PropTypes.object
}

export default ChangeFeatureModal
