import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import useOverlay from '@context/overlayContext'

import { useQuery } from '@apollo/react-hooks'
import { GetEvent } from '@graphql/event/queries.js'

import { theme } from '@util'
import { StyleSheet, ScrollView } from 'react-native'

import { Loading } from '@common'

import EventHeader from '@components/event/eventHeader'
import EventFooter from '@components/event/eventFooter'
import EventDetails from '@components/event/eventDetails'
import EventMediaSwiper from '@components/event/eventMediaSwiper'

import { adjustedScreenHeight } from '@components/event/utilComponents/eventUtil'

const initialState = {
  top: false,
  bottom: false
}

const EventContainer = ({ id }) => {
  const [buttons, setButtons] = useState(initialState)
  const { dispatch, actions } = useOverlay()

  const { data, loading } = useQuery(GetEvent, {
    variables: { id },
    fetchPolicy: 'cache-and-network',
    skip: !id
  })

  const setCachedMedia = index => {
    const media = event.media[index]
    const isAvatar = event.avatarId === media.id
    dispatch({ type: actions.dialog.updateCache, payload: { media, isAvatar } })
  }

  const toggleTop = () => {
    setButtons({ ...buttons, bottom: false, top: !buttons.top })
  }

  const toggleBottom = () => {
    setButtons({ ...buttons, top: false, bottom: !buttons.bottom })
  }

  const resetButtons = () => {
    setButtons(initialState)
  }

  if (loading) {
    return <Loading />
  }

  if (!data) return null
  const { event } = data

  return (
    <ScrollView
      style={styles.container}
      snapToInterval={adjustedScreenHeight}
      decelerationRate='fast'
    >
      <EventMediaSwiper media={event.media} setIndex={setCachedMedia} />
      <EventHeader
        open={buttons.top}
        toggleOpen={toggleTop}
        reset={resetButtons}
      />
      <EventFooter open={buttons.bottom} toggleOpen={toggleBottom} />
      <EventDetails event={event} styleProps={styles.image} />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.color.background
  }
})

EventContainer.propTypes = {
  id: PropTypes.string
}

export default EventContainer
