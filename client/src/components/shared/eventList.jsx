import React from 'react'
import PropTypes from 'prop-types'

import { View, StyleSheet, FlatList, Text, RefreshControl } from 'react-native'
import { ListItem, Image } from 'react-native-elements'
import { Loading } from '@common'

import { theme, formatDateTime } from '@util'

const EventList = ({ data, onEventPress, refreshing, onRefresh }) => {
  return (
    <View style={styles.container}>
      <FlatList
        style={{ minHeight: 100 }}
        refreshControl={
          <RefreshControl
            onRefresh={onRefresh}
            refreshing={refreshing}
            title='Pull to Refresh'
            titleColor={theme.color.tertiary}
            tintColor={theme.color.secondary}
          />
        }
        data={data}
        keyExtractor={event => event.id}
        ListFooterComponent={<View style={styles.image} />}
        renderItem={({ item }) => {
          const { name, avatar, location, date } = item

          return (
            <ListItem
              title={
                <View>
                  <Text style={styles.titleStyle} numberOfLines={2}>
                    {name}
                  </Text>
                  <Text style={styles.text} numberOfLines={1}>
                    {location.text}
                  </Text>
                  <Text style={styles.text} numberOfLines={1}>
                    {formatDateTime({ date })}
                  </Text>
                </View>
              }
              leftElement={
                <Image
                  source={{ uri: avatar.uri }}
                  style={styles.image}
                  borderRadius={10}
                  PlaceholderContent={<Loading size='small' />}
                />
              }
              containerStyle={styles.containerStyle}
              onPress={() => onEventPress(item)}
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
    height: 75,
    width: 75
  },
  noResults: {
    flex: 1,
    alignItems: 'center',
    marginTop: 50
  },
  noResultsText: {
    fontSize: 18
  }
})

EventList.propTypes = {
  data: PropTypes.array,
  onEventPress: PropTypes.func,
  onRefresh: PropTypes.func,
  refreshing: PropTypes.bool
}

export default EventList
