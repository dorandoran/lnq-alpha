import React, { useContext } from 'react'
import { Route } from '@context/routeStore'
import PropTypes from 'prop-types'

import { theme } from '@src/theme'
import { View, StyleSheet, FlatList, Text } from 'react-native'
import { ListItem, Image } from 'react-native-elements'
import { Loading } from '@common'
import { EVENT_CONST } from '@util/constants'
import { formatDateTime } from '@util'

const SearchEventList = ({ events }) => {
  const dispatch = useContext(Route.Dispatch)

  if (!events) return <Loading />

  return (
    <View style={styles.container}>
      <FlatList
        data={events}
        keyExtractor={event => event.id}
        renderItem={({ item }) => {
          const { id, name, avatar, location, date } = item
          return (
            <ListItem
              title={
                <View>
                  <Text style={styles.titleStyle}>{name}</Text>
                  <Text style={styles.text}>{location.text}</Text>
                  <Text style={styles.text}>{formatDateTime({ date })}</Text>
                </View>
              }
              leftElement={
                <Image
                  source={{ uri: avatar.uri }}
                  style={styles.image}
                  borderRadius={10}
                />
              }
              containerStyle={styles.containerStyle}
              onPress={() =>
                dispatch({
                  type: 'openModal',
                  payload: { id, type: EVENT_CONST }
                })
              }
            />
          )
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10
  },
  containerStyle: {
    borderRadius: 10,
    backgroundColor: theme.color.accent,
    height: 100,
    margin: 5
  },
  titleStyle: {
    color: theme.color.tertiary,
    fontSize: 18,
    fontWeight: 'bold'
  },
  text: {
    color: theme.color.tertiary
  },
  image: {
    height: 80,
    width: 80
  }
})

SearchEventList.propTypes = {
  events: PropTypes.array
}

export default SearchEventList
