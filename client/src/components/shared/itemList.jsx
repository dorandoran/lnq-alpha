import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

import {
  View,
  StyleSheet,
  FlatList,
  Text,
  RefreshControl,
  TouchableOpacity
} from 'react-native'
import { ListItem, Image } from 'react-native-elements'
import { Loading } from '@common'

import { theme, formatDateTime } from '@util'

const ItemList = ({
  data,
  onItemPress,
  onFollowPress,
  refreshing,
  onRefresh,
  selected,
  followSelected = selected,
  type = 'events',
  hideAvatar = false
}) => {
  const renderItem = item => {
    if (type === 'users') {
      return renderUserListItem(item)
    }
    return renderEventListItem(item)
  }

  // Event ListItem
  const renderEventListItem = item => {
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
        onPress={() => onItemPress(item)}
      />
    )
  }

  // User ListItem
  const renderUserListItem = item => {
    const { firstName, lastName, username, avatarUrl, isFollowing, id } = item
    const isFollowSelected = followSelected?.includes(id) || false
    const isSelected = selected?.includes(id) || false

    return (
      <ListItem
        title={
          <View style={styles.userTextContainer}>
            <Text
              style={[styles.title, { color: theme.color.placeholder }]}
              numberOfLines={1}
            >
              {username ? `@${username}` : 'No Username'}
            </Text>
            <Text style={styles.title} numberOfLines={1}>
              {`${firstName} ${lastName}`}
            </Text>
          </View>
        }
        leftElement={
          avatarUrl ? (
            <Image
              source={{ uri: avatarUrl }}
              style={styles.userImage}
              borderRadius={50}
              PlaceholderContent={<Loading size='small' />}
              placeholderStyle={styles.placeholder}
            />
          ) : (
            <View
              style={[
                styles.userImage,
                { backgroundColor: theme.color.background }
              ]}
            />
          )
        }
        rightElement={
          <TouchableOpacity
            style={[
              styles.actionButton,
              {
                borderColor: isFollowing
                  ? theme.color.tertiary
                  : isFollowSelected
                  ? theme.color.success
                  : theme.color.tertiary,
                backgroundColor: isFollowing
                  ? theme.color.success
                  : isFollowSelected
                  ? theme.color.tertiary
                  : theme.color.background
              }
            ]}
            onPress={
              onFollowPress
                ? () => onFollowPress(item)
                : () => onItemPress(item)
            }
          >
            <Text
              style={[
                styles.actionText,
                {
                  color: isFollowSelected
                    ? theme.color.background
                    : theme.color.tertiary
                }
              ]}
            >
              {isFollowing
                ? 'Following'
                : isFollowSelected
                ? 'Pending'
                : 'Follow'}
            </Text>
          </TouchableOpacity>
        }
        containerStyle={[
          styles.userContainerStyle,
          {
            backgroundColor: isSelected
              ? theme.color.success
              : theme.color.background
          }
        ]}
        onPress={() => onItemPress(item)}
      />
    )
  }

  return (
    <View style={styles.container}>
      <FlatList
        style={{ minHeight: 100 }}
        refreshControl={
          refreshing && (
            <RefreshControl
              onRefresh={onRefresh}
              refreshing={refreshing}
              title='Pull to Refresh'
              titleColor={theme.color.tertiary}
              tintColor={theme.color.secondary}
            />
          )
        }
        data={data}
        keyExtractor={event => event.id}
        ListFooterComponent={<View style={styles.image} />}
        renderItem={({ item }) => renderItem(item)}
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
  userContainerStyle: {
    borderRadius: 10,
    margin: 5,
    paddingVertical: 0,
    paddingHorizontal: 10,
    backgroundColor: theme.color.background,
    borderColor: theme.color.tertiary,
    borderWidth: 2
  },
  textContainer: {
    height: 100,
    paddingVertical: 15,
    paddingRight: 20
  },
  userTextContainer: {
    height: 75,
    justifyContent: 'center',
    paddingVertical: 10
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
  actionText: {
    color: theme.color.tertiary
  },
  image: {
    height: 80,
    width: 80
  },
  userImage: {
    height: 50,
    width: 50,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: theme.color.tertiary
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
  },
  actionButton: {
    width: '30%',
    height: 30,
    borderRadius: 25,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

ItemList.propTypes = {
  data: PropTypes.array,
  onItemPress: PropTypes.func,
  onFollowPress: PropTypes.func,
  onRefresh: PropTypes.func,
  refreshing: PropTypes.bool,
  hideAvatar: PropTypes.bool,
  type: PropTypes.string,
  selected: PropTypes.array,
  followSelected: PropTypes.array
}

export default ItemList
