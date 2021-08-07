import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useLazyQuery } from '@apollo/client'

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
  query,
  variables,
  noDataMessage,
  filterList,
  onItemPress,
  onFollowPress,
  refreshing,
  onRefresh,
  selected,
  followSelected = selected,
  type = 'events',
  hideAvatar = false
}) => {
  const [listData, setListData] = useState(data)
  const [refresh, setRefresh] = useState(false)
  const [getData, { loading, refetch }] = useLazyQuery(query, {
    fetchPolicy: 'cache-and-network',
    onCompleted: res => {
      let temp = res[Object.keys(res)[0]]
      if (filterList) {
        temp = filterList(temp)
      }
      setListData(temp)
    }
  })

  useEffect(() => {
    if (query) {
      getData({
        variables
      })
    }

    if (data) {
      setListData(data)
    }
    return () => setListData([])
  }, [query, data])

  const handleRefresh = () => {
    setRefresh(true)
    refetch()
  }

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
        onPress={() => onItemPress(item)}
        containerStyle={styles.containerStyle}
      >
        {avatar && (
          <Image
            source={{ uri: avatar.uri }}
            style={styles.image}
            borderRadius={10}
            PlaceholderContent={<Loading size='small' />}
            placeholderStyle={styles.placeholder}
          />
        )}
        <ListItem.Content>
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
            {!hideAvatar && owner?.avatar ? (
              <Image
                source={{ uri: owner.avatar.uri }}
                style={styles.avatar}
                borderRadius={25}
                placeholderStyle={styles.placeholder}
                PlaceholderContent={<Loading size='small' />}
              />
            ) : null}
          </View>
        </ListItem.Content>
      </ListItem>
    )
  }

  // User ListItem
  const renderUserListItem = item => {
    const { firstName, lastName, username, avatar, id } = item
    const isFollowSelected = followSelected?.includes(id) || false
    const isSelected = selected?.includes(id) || false

    return (
      <ListItem
        onPress={() => onItemPress(item)}
        containerStyle={[
          styles.userContainerStyle,
          {
            backgroundColor: isSelected
              ? theme.color.success
              : theme.color.background
          }
        ]}
      >
        {avatar ? (
          <Image
            source={{ uri: avatar.uri }}
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
        )}
        <ListItem.Content style={styles.userTextContainer}>
          <Text
            style={[styles.title, { color: theme.color.placeholder }]}
            numberOfLines={1}
          >
            {username ? `@${username}` : 'No Username'}
          </Text>
          <Text style={styles.title} numberOfLines={1}>
            {`${firstName} ${lastName}`}
          </Text>
        </ListItem.Content>
        {onFollowPress && (
          <TouchableOpacity
            style={[
              styles.actionButton,
              {
                borderColor: item?.isFollowing
                  ? theme.color.tertiary
                  : isFollowSelected
                  ? theme.color.success
                  : theme.color.tertiary,
                backgroundColor: item?.isFollowing
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
                  color: item?.isFollowing
                    ? theme.color.tertiary
                    : isFollowSelected
                    ? theme.color.background
                    : theme.color.tertiary
                }
              ]}
            >
              {item?.isFollowing
                ? 'Following'
                : isFollowSelected
                ? 'Pending'
                : 'Follow'}
            </Text>
          </TouchableOpacity>
        )}
      </ListItem>
    )
  }

  // Handle Loading
  if (listData === undefined || loading) return <Loading position='top' />
  // Reset Refresh
  if (refresh) setRefresh(false)
  if (!listData?.length) {
    return (
      <View style={styles.noResults}>
        <Text style={[styles.text, styles.noResultsText]}>{noDataMessage}</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <FlatList
        style={{ minHeight: 100 }}
        refreshControl={
          (onRefresh || query) && (
            <RefreshControl
              onRefresh={onRefresh || handleRefresh}
              refreshing={refreshing || refresh}
              title='Pull to Refresh'
              titleColor={theme.color.tertiary}
              tintColor={theme.color.secondary}
            />
          )
        }
        data={listData}
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
    backgroundColor: 'transparent',
    borderRadius: 50
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
  query: PropTypes.object,
  variables: PropTypes.any,
  noDataMessage: PropTypes.string,
  filterList: PropTypes.func,
  onItemPress: PropTypes.func.isRequired,
  onFollowPress: PropTypes.func,
  onRefresh: PropTypes.func,
  refreshing: PropTypes.bool,
  hideAvatar: PropTypes.bool,
  type: PropTypes.string,
  selected: PropTypes.array,
  followSelected: PropTypes.array
}

export default ItemList
