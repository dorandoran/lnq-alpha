import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import useStorage from '@hooks/useStorage'
import useUser from '@context/userContext'
import useCreate from '@context/createContext'
import useCreateEvent from '@graphql/event/useCreateEvent'

import {
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
  Keyboard
} from 'react-native'
import { Icon } from 'react-native-elements'
import { theme } from '@util'
import { BUCKET } from '@util/constants'

const ActionSaveEvent = ({ onOpen, onComplete, onSuccess }) => {
  const [actionSelected, setActionSelected] = useState(false)
  const { details } = useCreate()
  const createEvent = useCreateEvent()
  const ownerId = useUser()

  // If action is selected, run useStorage
  const { media } = useStorage({
    uri: details.media[0].uri,
    bucketName: BUCKET.EVENT,
    skip: !actionSelected
  })

  const selectAction = () => {
    Keyboard.dismiss()
    if (onOpen) onOpen()
    setActionSelected(true)
  }

  useEffect(() => {
    let didCancel = false
    if (media) {
      // Clean up event object and send to server
      details.id = media.linkId
      details.avatarId = media.id
      delete details.media
      !didCancel && createEvent({ ...details, ownerId })

      // Action clean up
      setActionSelected(false)
      if (onSuccess) onSuccess()
      onComplete()

      return () => {
        didCancel = true
      }
    }
  }, [media])

  if (actionSelected) {
    return <ActivityIndicator size='small' color={theme.color.secondary} />
  }

  return (
    <TouchableOpacity style={styles.padding} onPress={selectAction}>
      <Icon type='ionicon' name='md-share' color={theme.color.tertiary} />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  padding: {
    padding: '1%',
    aspectRatio: 1
  }
})

ActionSaveEvent.propTypes = {
  onOpen: PropTypes.func,
  onComplete: PropTypes.func.isRequired,
  onSuccess: PropTypes.func
}

export default ActionSaveEvent
