/* eslint-disable react/prop-types */
import React from 'react'
import PropTypes from 'prop-types'

import Carousel from 'react-native-snap-carousel'
import { StyleSheet } from 'react-native'
import { Image } from 'react-native-elements'

import { SCREEN_WIDTH } from '@util/constants'
import { adjustedScreenHeight } from '@components/event/utilComponents/eventUtil'
import { Loading } from '@common'

const EventMediaSwiper = ({ media, setIndex }) => {
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
    <Carousel
      data={media}
      renderItem={renderItem}
      sliderWidth={SCREEN_WIDTH}
      itemWidth={SCREEN_WIDTH}
      itemHeight={adjustedScreenHeight}
      inactiveSlideOpacity={1}
      inactiveSlideScale={1}
      firstItem={0}
      onSnapToItem={setIndex}
      loop
    />
  )
}

const styles = StyleSheet.create({
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

EventMediaSwiper.propTypes = {
  media: PropTypes.array,
  setIndex: PropTypes.func
}

export default EventMediaSwiper
