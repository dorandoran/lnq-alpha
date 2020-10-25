import React from 'react'
import PropTypes from 'prop-types'

import { useQuery } from '@apollo/client'
import { LocateSearch } from '@graphql/search/queries'

import MapView, { Marker, Callout } from 'react-native-maps'
import { View, StyleSheet, Text } from 'react-native'
import { Image } from 'react-native-elements'

import { theme, formatDateTime, SCREEN_WIDTH, SCREEN_HEIGHT } from '@util'

const LocateScreen = () => {
  const { data } = useQuery(LocateSearch)

  if (!data || !data.locateSearch.length) {
    return (
      <MapView
        style={styles.mapContainer}
      />
    )
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.mapContainer}
        initialRegion={{ latitude: 38.8029849, longitude: -77.2961287, latitudeDelta: 0.0922, longitudeDelta: 0.0421 }}
      >
        {data.locateSearch.map(event => {
          return (
            <Marker
              key={event.id}
              coordinate={event.location}
            >
              <View style={{ width: '100%' }}>
                <Image source={{ uri: event.owner.avatar.uri }} style={styles.avatar} borderRadius={25} />
              </View>
              <Callout >
                <View style={styles.calloutContainer}>
                  <Text>{event.name}</Text>
                  <Text>{formatDateTime(event.date)}</Text>
                  <Text>{`Hosted By: @${event.owner.username}`}</Text>
                </View>
              </Callout>
            </Marker>
          )
        })}
      </MapView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.color.background
  },
  mapContainer: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT
  },
  calloutContainer: {
    width: SCREEN_WIDTH / 2
  },
  avatar: {
    height: SCREEN_HEIGHT / 25,
    width: SCREEN_HEIGHT / 25,
    borderWidth: 1,
    borderColor: theme.color.tertiary,
    borderRadius: 50
  },
})

LocateScreen.propTypes = {
  navigation: PropTypes.object
}

export default LocateScreen
