import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { useQuery } from '@apollo/react-hooks'
import { GetEvent } from '@graphql/event/queries.js'

import { theme } from '@src/theme'
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableWithoutFeedback
} from 'react-native'
import { Image } from 'react-native-elements'
import { Loading } from '@common'
import Swiper from 'react-native-swiper'

import EventHeader from '@components/event/eventHeader'
import EventFooter from '@components/event/eventFooter'
import EventDetails from '@components/event/eventDetails'

import { SCREEN_WIDTH } from '@util/constants'
import { adjustedScreenHeight } from '@components/event/utilComponents/eventUtil'

const initialState = {
  top: false,
  bottom: false
  // mediaIdx: 0
}

const EventContainer = ({ id }) => {
  const [buttons, setButtons] = useState(initialState)
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
    setButtons({ bottom: false, top: !buttons.top })
  }

  const toggleBottom = () => {
    setButtons({ top: false, bottom: !buttons.bottom })
  }

  // There is a React-Native bug where <TouchableWithoutFeedback />
  // does not work unless it's child is a <View />
  return (
    <ScrollView
      style={[styles.container, styles.flex]}
      snapToInterval={adjustedScreenHeight}
      decelerationRate='fast'
    >
      <Swiper showsPagination={false}>
        {event.media.map(media => {
          return (
            <Image
              key={media.id}
              source={{ uri: media.uri }}
              style={styles.image}
              PlaceholderContent={<Loading />}
            />
          )
        })}
      </Swiper>

      <EventHeader event={event} open={buttons.top} toggleOpen={toggleTop} />
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
