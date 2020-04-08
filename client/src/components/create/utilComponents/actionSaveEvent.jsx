import React, { useState, useEffect, useContext } from 'react'
import PropTypes from 'prop-types'
import useStorage from '@hooks/useStorage'
import { useUser } from '@context/userContext'
import CreateContext from '@context/createContext'
import useCreateEvent from '@graphql/event/useCreateEvent'

import { ActivityIndicator } from 'react-native'
import { Icon } from 'react-native-elements'
import { theme } from '@src/theme'
import { EVENT_CONST } from '@common/constants'

const ActionSaveEvent = ({ onComplete }) => {
  const [actionSelected, setActionSelected] = useState(false)
  const { details } = useContext(CreateContext)
  const createEvent = useCreateEvent()
  const userId = useUser()

  // If action is selected, run useStorage
  const { media } = useStorage({
    uri: details.media[0].uri,
    bucketName: EVENT_CONST,
    skip: !actionSelected
  })

  useEffect(() => {
    let didCancel = false
    if (media) {
      // Clean up event object and send to server
      details.media = [media.id]
      details.id = media.linkId
      !didCancel && createEvent({ ...details, userId })

      // Action clean up
      setActionSelected(false)
      onComplete()

      return () => {
        didCancel = true
      }
    }
  }, [media])

  if (actionSelected) {
    return <ActivityIndicator size="small" color={theme.color.secondary} />
  }

  return (
    <Icon
      type="ionicon"
      name="md-share"
      color={theme.color.tertiary}
      onPress={() => setActionSelected(true)}
    />
  )
}

ActionSaveEvent.propTypes = {
  onComplete: PropTypes.func.isRequired
}

export default ActionSaveEvent
