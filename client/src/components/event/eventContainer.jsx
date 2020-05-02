import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import useUser from '@context/userContext'
import { useQuery } from '@apollo/react-hooks'
import { GetEvent } from '@graphql/event/queries.js'

import EventHeader from '@components/event/eventHeader'
import EventFooter from '@components/event/eventFooter'
import EventDetails from '@components/event/eventDetails'
import EventMediaSwiper from '@components/event/eventMediaSwiper'

import { theme } from '@util'
import { adjustedScreenHeight } from '@components/event/utilComponents/eventUtil'
import { StyleSheet, ScrollView } from 'react-native'
import { Loading } from '@common'

const initialState = {
  topBtn: false,
  bottomBtn: false,
  media: { index: 0 },
  edit: null
}

const EventContainer = ({ id, isDialogOpen }) => {
  const userId = useUser()
  const [state, setState] = useState(initialState)
  const editEnabled = !!state.edit

  const { data, loading } = useQuery(GetEvent, {
    variables: { id },
    fetchPolicy: 'cache-and-network',
    skip: !id
  })

  useEffect(() => {
    if (data?.event && !isDialogOpen) {
      updateMedia(state.media.index)
    }
  }, [data?.event, isDialogOpen])

  if (loading) {
    return <Loading />
  }

  if (!data) return null
  const { event } = data
  const canEdit = event.owner.id === userId
  const canEditMedia = (state.media.userId || event.owner.id) === userId

  const updateMedia = index => {
    const media = event.media[index]
    const isAvatar = event.avatarId === media?.id
    setState({ ...state, media: { ...media, index, isAvatar } })
  }

  const toggleTopBtn = () => {
    setState({ ...state, bottomBtn: false, topBtn: !state.topBtn })
  }

  const toggleBottomBtn = () => {
    setState({ ...state, topBtn: false, bottomBtn: !state.bottomBtn })
  }

  const setEdit = edit => {
    setState({ ...state, topBtn: false, bottomBtn: false, edit })
  }

  return (
    <ScrollView
      style={styles.container}
      snapToInterval={adjustedScreenHeight}
      decelerationRate='fast'
      scrollEnabled={!editEnabled}
    >
      <EventMediaSwiper media={event.media} updateMedia={updateMedia} />
      <EventHeader
        state={state}
        toggleOpen={toggleTopBtn}
        canEdit={canEdit}
        canEditMedia={canEditMedia}
      />
      <EventFooter
        open={state.bottomBtn}
        toggleOpen={toggleBottomBtn}
        canEdit={canEdit}
      />
      <EventDetails
        event={event}
        edit={state.edit}
        setEdit={setEdit}
        canEdit={canEdit}
      />
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
