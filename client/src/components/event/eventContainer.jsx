import React, { useState } from 'react'
import PropTypes from 'prop-types'
import useDialog from '@context/dialogContext'

import { useQuery } from '@apollo/react-hooks'
import { GetEvent } from '@graphql/event/queries.js'

import { theme } from '@src/theme'
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
  const { updateTemp } = useDialog()

  const { data, loading } = useQuery(GetEvent, {
    variables: { id },
    skip: !id
  })

  if (loading) {
    return <Loading />
  }

  if (!data) return null
  const { event } = data

  const toggleTop = () => {
    setButtons({ ...buttons, bottom: false, top: !buttons.top })
  }

  const toggleBottom = () => {
    setButtons({ ...buttons, top: false, bottom: !buttons.bottom })
  }

  const resetButtons = () => {
    setButtons(initialState)
  }

  const setMediaIndex = index => {
    const media = event.media[index]
    updateTemp({ media })
  }

  return (
    <ScrollView
      style={styles.container}
      snapToInterval={adjustedScreenHeight}
      decelerationRate='fast'
    >
      <EventMediaSwiper media={event.media} setIndex={setMediaIndex} />
      <EventHeader
        event={event}
        open={buttons.top}
        toggleOpen={toggleTop}
        reset={resetButtons}
      />
      <EventFooter
        event={event}
        open={buttons.bottom}
        toggleOpen={toggleBottom}
      />
      <EventDetails event={data.event} styleProps={styles.image} />
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
