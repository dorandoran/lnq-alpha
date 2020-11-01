import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import useUser from '@context/userContext'
import { useQuery } from '@apollo/client'
import { GetEvent } from '@graphql/event/queries.js'

import EventHeader from '@components/event/eventHeader'
import EventFooter from '@components/event/eventFooter'
import EventDetails from '@components/event/eventDetails'
import EventMediaSwiper from '@components/event/eventMediaSwiper'
import Modal from 'react-native-modal'
import EventMenuModal from '@components/event/utilComponents/actionEventMenuDialog'
import AddMediaModal from '@components/event/utilComponents/actionAddMediaDialog'

import { theme } from '@util'
import { adjustedScreenHeight } from '@components/event/utilComponents/eventUtil'
import { StyleSheet, ScrollView, View } from 'react-native'
import { Loading } from '@common'

const initialState = {
  modal: '',
  menu: false,
  bottomBtn: false,
  media: { index: 0 },
  edit: null
}

const MODAL = {
  MENU: 'eventMenu',
  ADD_MEDIA: 'addMedia'
}

const EventContainer = ({ id }) => {
  const user = useUser()
  const [state, setState] = useState(initialState)
  const editEnabled = !!state.edit

  const { data, loading } = useQuery(GetEvent, {
    variables: { id },
    fetchPolicy: 'cache-and-network',
    skip: !id
  })

  useEffect(() => {
    if (data?.event && updateMedia) {
      updateMedia(state.media.index)
    }

    return () => setState(initialState)
  }, [data?.event])

  if (loading) {
    return <Loading />
  }

  if (!data) return null
  const { event } = data
  const permissions = {
    edit: event.owner.id === user.id,
    editMedia: (state.media.userId || event.owner.id) === user.id
  }

  const updateMedia = index => {
    const media = event.media[index]
    const isAvatar = event.avatar.id === media?.id
    setState({ ...state, media: { ...media, index, isAvatar, permissions } })
  }

  const toggleBottomBtn = () => {
    setState({ ...state, menu: false, bottomBtn: !state.bottomBtn })
  }

  const setEdit = edit => {
    setState({ ...state, menu: false, bottomBtn: false, edit })
  }

  const modalActions = {
    openAddMedia: () => {
      setState({ ...state, modal: MODAL.ADD_MEDIA })
    },
    openMenu: () => {
      setState({ ...state, modal: MODAL.MENU })
    },
    cancelModal: () => {
      setState({ ...state, modal: '' })
    }
  }

  const renderModal = () => {
    switch (state.modal) {
      case MODAL.MENU: {
        return (
          <EventMenuModal
            event={event}
            currentMedia={state.media}
            modalActions={modalActions}
          />
        )
      }
      case MODAL.ADD_MEDIA: {
        return <AddMediaModal event={event} modalActions={modalActions} />
      }
      default:
        return <View />
    }
  }

  return (
    <React.Fragment>
      <ScrollView
        style={styles.container}
        snapToInterval={adjustedScreenHeight}
        decelerationRate='fast'
        scrollEnabled={!editEnabled}
      >
        <EventMediaSwiper media={event.media} updateMedia={updateMedia} />
        <EventHeader
          state={state}
          handleOpenMenu={modalActions.openMenu}
          canEditMedia={permissions.editMedia}
        />
        <EventFooter
          open={state.bottomBtn}
          toggleOpen={toggleBottomBtn}
          canEdit={permissions.edit}
        />
        <EventDetails
          event={event}
          edit={state.edit}
          setEdit={setEdit}
          canEdit={permissions.edit}
        />
      </ScrollView>
      <Modal isVisible={!!state.modal}>{renderModal()}</Modal>
    </React.Fragment>
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
