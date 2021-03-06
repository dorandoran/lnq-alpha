import React from 'react'
import PropTypes from 'prop-types'

import useUser from '@context/userContext'
import { useQuery } from '@apollo/client'
import { GetEvent } from '@graphql/event/queries'
import useNotification from '@hooks/useNotification'

import EventHeader from '@components/event/eventHeader'
import EventFooter from '@components/event/eventFooter'
import EventDetails from '@components/event/eventDetails'
import EventMenuModal from '@components/event/utilComponents/eventMenuModal'
import AddMediaModal from '@components/shared/addMediaModal'
import ChangeFeaturedModal from '@components/event/utilComponents/changeFeatureModal'
import DeleteMediaModal from '@components/event/utilComponents/deleteMediaModal'
import UpdateEventModal from '@components/event/utilComponents/updateEventModal'
import DeleteEventModal from '@components/event/utilComponents/deleteEventModal'
import EventModalContainer from '@components/event/utilComponents/eventModalContainer'

import Carousel from 'react-native-snap-carousel'
import { StyleSheet, ScrollView, View } from 'react-native'
import { Image } from 'react-native-elements'
import { Loading } from '@common'
import { theme, SCREEN_WIDTH, BUCKET, OPERATION } from '@util'
import { adjustedScreenHeight } from '@components/event/utilComponents/eventUtil'

const initialState = {
  modal: '',
  edit: {
    enabled: false,
    field: null,
    additionalFields: null,
    updates: {}
  }
}

const MODAL = {
  MENU: 'eventMenu',
  ADD_MEDIA: 'addMedia',
  CHANGE_FEATURED: 'changeFeatured',
  DELETE_MEDIA: 'deleteMedia',
  EDIT_EVENT: 'editEvent',
  DELETE_EVENT: 'deleteEvent'
}

const EventContainer = ({ id }) => {
  const [state, setState] = React.useState(initialState)
  const carousel = React.useRef(null)
  const { user } = useUser()
  const editEnabled = state.edit.enabled
  const { throwSuccess } = useNotification()
  const { data, loading } = useQuery(GetEvent, {
    variables: { id },
    fetchPolicy: 'cache-and-network',
    skip: !id
  })

  // Catch event cache changes
  React.useEffect(() => {
    return () => setState(initialState)
  }, [data?.event])

  if (loading) {
    return <Loading />
  }

  if (!data) return null
  const { event } = data
  const permissions = {
    canEditEvent: event.owner.id === user.id,
    canDeleteEvent: event.owner.id === user.id
  }

  const editActions = {
    enableEdit: () => {
      setState({ ...state, edit: { ...state.edit, enabled: true } })
    },
    disableEdit: () => {
      setState(initialState)
    },
    addUpdate: update => {
      setState({
        modal: '',
        edit: { ...state.edit, updates: { ...state.edit.updates, ...update } }
      })
    }
  }

  const modalActions = {
    openMenu: () => {
      setState({ ...state, modal: MODAL.MENU })
    },
    cancelModal: () => {
      setState({ ...state, modal: '' })
    },
    openAddMedia: () => {
      setState({ ...state, modal: MODAL.ADD_MEDIA })
    },
    changeFeatured: () => {
      setState({ ...state, modal: MODAL.CHANGE_FEATURED })
    },
    deleteMedia: () => {
      setState({ ...state, modal: MODAL.DELETE_MEDIA })
    },
    updateEvent: ({ field, additionalFields }) => {
      setState({
        edit: { ...state.edit, field, additionalFields },
        modal: MODAL.EDIT_EVENT
      })
    },
    deleteEvent: () => {
      setState({ ...state, modal: MODAL.DELETE_EVENT })
    }
  }

  const onAddMediaCompleted = () => {
    modalActions.cancelModal()
    throwSuccess('Media successfully added.')
  }

  const renderModal = () => {
    if (state.modal) {
      const media = event.media[carousel.current.currentIndex]
      switch (state.modal) {
        case MODAL.MENU: {
          return (
            <EventMenuModal
              event={event}
              media={media}
              modalActions={modalActions}
            />
          )
        }
        case MODAL.ADD_MEDIA:
          return (
            <AddMediaModal
              entity={event}
              bucketType={BUCKET.EVENT}
              operation={OPERATION.CREATE}
              modalActions={modalActions}
              onCompleted={onAddMediaCompleted}
            />
          )
        case MODAL.CHANGE_FEATURED:
          return (
            <ChangeFeaturedModal
              event={event}
              media={media}
              modalActions={modalActions}
            />
          )
        case MODAL.DELETE_MEDIA:
          return (
            <DeleteMediaModal
              event={event}
              media={media}
              modalActions={modalActions}
            />
          )
        case MODAL.EDIT_EVENT:
          return (
            <UpdateEventModal
              modalActions={modalActions}
              editActions={editActions}
              event={event}
              field={state.edit.field}
              additionalFields={state.edit.additionalFields}
            />
          )
        case MODAL.DELETE_EVENT:
          return (
            <DeleteEventModal
              event={event}
              modalActions={modalActions}
              permissions={permissions}
            />
          )
        default:
          return <View />
      }
    }
  }

  const renderItem = ({ item }) => {
    return (
      <Image
        source={{ uri: item.uri }}
        style={styles.image}
        PlaceholderContent={<Loading />}
      />
    )
  }

  return (
    <React.Fragment>
      <ScrollView
        style={styles.container}
        snapToInterval={adjustedScreenHeight}
        decelerationRate='fast'
        nestedScrollEnabled={true}
        scrollEnabled={!editEnabled}
        // disableScrollViewPanResponder={true}
        showsVerticalScrollIndicator={false}
      >
        <Carousel
          ref={carousel}
          data={data.event.media}
          renderItem={renderItem}
          sliderWidth={SCREEN_WIDTH}
          itemWidth={SCREEN_WIDTH}
          itemHeight={adjustedScreenHeight}
          inactiveSlideOpacity={1}
          inactiveSlideScale={1}
          loop
        />
        <EventHeader handleOpenMenu={modalActions.openMenu} />
        <EventFooter event={event} modalActions={modalActions} />
        <EventDetails
          event={event}
          edit={state.edit}
          editActions={editActions}
          modalActions={modalActions}
          permissions={permissions}
        />
      </ScrollView>
      <EventModalContainer isVisible={!!state.modal}>
        {renderModal()}
      </EventModalContainer>
    </React.Fragment>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.color.background
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'space-between',
    paddingTop: '3%',
    paddingBottom: '3%'
  },
  image: {
    height: adjustedScreenHeight,
    width: SCREEN_WIDTH
  }
})

EventContainer.propTypes = {
  id: PropTypes.string
}

export default EventContainer
