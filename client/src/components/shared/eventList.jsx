import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

import { View, StyleSheet, FlatList, Text, RefreshControl } from 'react-native'
import { ListItem, Image } from 'react-native-elements'
import { Loading } from '@common'

import { theme, formatDateTime } from '@util'

const EventList = ({
  data,
  onEventPress,
  refreshing,
  onRefresh,
  hideAvatar = false
}) => {
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
          const { name, avatar, location, date, owner } = item

          return (
            <ListItem
              title={
                <Fragment>
                  <View style={styles.textContainer}>
                    <Text style={styles.title} numberOfLines={2}>
                      {name}
                    </Text>
                    <Text style={styles.text} numberOfLines={1}>
                      {location.text}
                    </Text>
                    <Text style={styles.text} numberOfLines={1}>
                      {formatDateTime({ date })}
                    </Text>
                  </View>
                  <View style={styles.avatarContainer}>
                    {!hideAvatar && owner?.avatarUrl ? (
                      <Image
                        source={{ uri: owner.avatarUrl }}
                        style={styles.avatar}
                        borderRadius={25}
                        placeholderStyle={styles.placeholder}
                        PlaceholderContent={
                          <Loading size='small' backgroundColor='transparent' />
                        }
                      />
                    ) : null}
                  </View>
                </Fragment>
              }
              leftElement={
                <Image
                  source={{ uri: avatar.uri }}
                  style={styles.image}
                  borderRadius={10}
                  PlaceholderContent={<Loading size='small' />}
                  placeholderStyle={styles.placeholder}
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
    margin: 5,
    paddingVertical: 0,
    paddingHorizontal: 10
  },
  textContainer: {
    height: 100,
    paddingVertical: 15,
    paddingRight: 20
  },
  avatarContainer: {
    position: 'absolute',
    top: 10,
    right: 0
  },
  placeholder: {
    backgroundColor: 'transparent'
  },
  title: {
    color: theme.color.tertiary,
    fontSize: 16,
    fontWeight: 'bold'
  },
  text: {
    color: theme.color.placeholder
  },
  image: {
    height: 80,
    width: 80
  },
  avatar: {
    height: 25,
    width: 25
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
  refreshing: PropTypes.bool,
  hideAvatar: PropTypes.bool
}

export default EventList
