import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import useStorage from '@hooks/useStorage'
import { useUser } from '@context/userContext'
import useCreateEvent from '@graphql/event/useCreateEvent'

import { ActivityIndicator } from 'react-native'
import { Icon } from 'react-native-elements'
import { theme } from '@src/theme'
import { EVENT_CONST } from '@common/constants'

const ActionSaveEvent = ({ event, onComplete }) => {
  const [actionSelected, setActionSelected] = useState(false)
  const createEvent = useCreateEvent()
  const userId = useUser()

  // If action is selected, run useStorage
  const { media } = useStorage({
    localMediaUri: event?.media?.uri,
    bucketName: EVENT_CONST,
    skip: !actionSelected
  })

  useEffect(() => {
    if (media) {
      // Clean up event object and send to server
      event.media = [media.id]
      event.id = media.linkId
      createEvent({ ...event, userId })

      // Action clean up
      setActionSelected(false)
      onComplete()
    }
  }, [media])

  // Checks if keys that have strings are filled
  // If not, disable button
  const checkDisabled = () => {
    let disabled = false
    Object.keys(event).forEach(key => {
      if (typeof event[key] === 'string' && !event[key].length) {
        disabled = true
      }
    })
    return disabled
  }

  if (actionSelected) {
    return <ActivityIndicator size="small" color={theme.color.secondary} />
  }

  if (checkDisabled()) {
    return (
      <Icon
        type="font-awesome"
        name="exclamation"
        color={theme.color.secondary}
      />
    )
  }

  return (
    <Icon
      type="material"
      name="person-add"
      color={theme.color.tertiary}
      onPress={() => setActionSelected(true)}
    />
  )
}

ActionSaveEvent.propTypes = {
  event: PropTypes.object.isRequired,
  onComplete: PropTypes.func.isRequired
}

export default ActionSaveEvent
