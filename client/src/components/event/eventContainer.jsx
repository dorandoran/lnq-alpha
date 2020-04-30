import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

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
  topBtn: false,
  bottomBtn: false,
  media: { index: 0 }
}

const EventContainer = ({ id, isDialogOpen }) => {
  const [state, setState] = useState(initialState)

  const { data, loading } = useQuery(GetEvent, {
    variables: { id },
    fetchPolicy: 'cache-and-network',
    skip: !id
  })

  useEffect(() => {
    if (data?.event && !isDialogOpen) {
      updateMedia(state.media.index)
    }
    return () => setState({ ...state, topBtn: false, bottomBtn: false })
  }, [data?.event, isDialogOpen])

  if (loading) {
    return <Loading />
  }

  if (!data) return null
  const { event } = data

  const updateMedia = index => {
    const media = event.media[index]
    const isAvatar = event.avatarId === media.id
    setState({ ...state, media: { ...media, index, isAvatar } })
  }

  const toggleTopBtn = () => {
    setState({ ...state, bottomBtn: false, topBtn: !state.topBtn })
  }

  const toggleBottomBtn = () => {
    setState({ ...state, topBtn: false, bottomBtn: !state.bottomBtn })
  }

  return (
    <ScrollView
      style={styles.container}
      snapToInterval={adjustedScreenHeight}
      decelerationRate='fast'
    >
      <EventMediaSwiper media={event.media} updateMedia={updateMedia} />
      <EventHeader state={state} toggleOpen={toggleTopBtn} />
      <EventFooter open={state.bottomBtn} toggleOpen={toggleBottomBtn} />
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
  id: PropTypes.string,
  isDialogOpen: PropTypes.bool
}

export default EventContainer
