import React from 'react'
import PropTypes from 'prop-types'

import useUser from '@context/userContext'
import { useQuery } from '@apollo/client'
import { GetEvent } from '@graphql/event/queries.js'

import EventHeader from '@components/event/eventHeader'
import EventFooter from '@components/event/eventFooter'
import EventDetails from '@components/event/eventDetails'
import EventMenuModal from '@components/event/utilComponents/eventMenuModal'
import AddMediaModal from '@components/event/utilComponents/addMediaModal'
import ChangeFeaturedModal from '@components/event/utilComponents/changeFeatureModal'
import DeleteMediaModal from '@components/event/utilComponents/deleteMediaModal'
import EventModalContainer from '@components/event/utilComponents/eventModalContainer'

import Carousel from 'react-native-snap-carousel'
import { StyleSheet, ScrollView, View } from 'react-native'
import { Image } from 'react-native-elements'
import { Loading } from '@common'
import { theme, SCREEN_WIDTH } from '@util'
import { adjustedScreenHeight } from '@components/event/utilComponents/eventUtil'

const initialState = {
  modal: '',
  edit: null
}

const MODAL = {
  MENU: 'eventMenu',
  ADD_MEDIA: 'addMedia',
  CHANGE_FEATURED: 'changeFeatured',
  DELETE_MEDIA: 'deleteMedia'
}

const EventContainer = ({ id }) => {
  const [state, setState] = React.useState(initialState)
  const carousel = React.useRef(null)
  const user = useUser()
  const editEnabled = !!state.edit

  const { data, loading } = useQuery(GetEvent, {
    variables: { id },
    fetchPolicy: 'cache-and-network',
    skip: !id
  })

  React.useEffect(() => {}, [data?.event])

  if (loading) {
    return <Loading />
  }

  if (!data) return null
  const { event } = data

  const permissions = {
    edit: event.owner.id === user.id
  }

  const setEdit = edit => {
    setState({ ...state, menu: false, bottomBtn: false, edit })
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
    }
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
          return <AddMediaModal event={event} modalActions={modalActions} />
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
        scrollEnabled={!editEnabled}
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
        <EventHeader state={state} handleOpenMenu={modalActions.openMenu} />
        <EventFooter modalActions={modalActions} />
        <EventDetails
          event={event}
          edit={state.edit}
          setEdit={setEdit}
          canEdit={permissions.edit}
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
