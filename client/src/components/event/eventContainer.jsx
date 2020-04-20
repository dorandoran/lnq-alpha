import React from 'react'
import PropTypes from 'prop-types'

import { useQuery } from '@apollo/react-hooks'
import { GetEvent } from '@graphql/event/queries.js'

import { theme } from '@src/theme'
import { View, StyleSheet, ImageBackground, ScrollView } from 'react-native'
import { Loading } from '@common'

import EventHeader from '@components/event/eventHeader'
import EventFooter from '@components/event/eventFooter'
import EventDetails from '@components/event/eventDetails'

import { SCREEN_WIDTH } from '@util/constants'
import { adjustedScreenHeight } from '@components/event/utilComponents/eventUtil'

const EventContainer = ({ id }) => {
  const { data, loading } = useQuery(GetEvent, {
    variables: { id },
    skip: !id
  })

  if (loading) {
    return <Loading />
  }

  if (!data) return null

  return (
    <ScrollView
      style={[styles.container, styles.flex]}
      snapToInterval={adjustedScreenHeight}
      decelerationRate='fast'
    >
      <ImageBackground
        source={{ uri: data?.event.media[0].uri }}
        style={styles.image}
      >
        <View style={styles.imageContainer}>
          <EventHeader />
          <EventFooter />
        </View>
      </ImageBackground>
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
