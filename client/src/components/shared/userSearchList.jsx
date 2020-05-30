import React from 'react'
import PropTypes from 'prop-types'

import { useDebounce } from '@hooks/useDebounce'
import { useQuery } from '@apollo/react-hooks'
import { UserSearch } from '@graphql/search/queries'
import { GetFollowing } from '@graphql/follow/queries'

import { SearchBar } from 'react-native-elements'
import { View, StyleSheet, Text } from 'react-native'
import UserList from '@components/shared/itemList'
import { KeyboardDismiss, Loading } from '@common'
import { theme } from '@util'

const UserSearchList = ({
  styleProps,
  value,
  onChangeText,
  selected,
  followSelected,
  onItemPress,
  onFollowPress
}) => {
  const [query, setQuery] = React.useState('')
  const { data: followData } = useQuery(GetFollowing, {
    fetchPolicy: 'cache-and-network',
    skip: following
  })

  // Filter Accepted Follows
  const following =
    followData?.user?.following
      .map(link => {
        if (link.answer === 'ACCEPTED') {
          return link.recipientId
        }
        return
      })
      .filter(Boolean) || null

  const { data, loading } = useQuery(UserSearch, {
    variables: { query, page: 0, following },
    skip: !following
  })

  useDebounce(() => setQuery(value), 1000, value)

  const renderList = () => {
    if (data === undefined || loading) return <Loading position='top' />
    if (!data?.userSearch?.length) {
      return (
        <View style={styles.noResults}>
          <Text style={[styles.text, styles.noResultsText]}>
            No search results found
          </Text>
        </View>
      )
    }
    return (
      <UserList
        type='users'
        data={[...data.userSearch]}
        onItemPress={onItemPress}
        selected={selected}
        followSelected={followSelected}
        onFollowPress={onFollowPress}
      />
    )
  }

  return (
    <KeyboardDismiss>
      <View style={[styles.container, styleProps]}>
        <SearchBar
          placeholder='Search'
          value={value}
          onChangeText={onChangeText}
          containerStyle={styles.containerStyle}
          inputContainerStyle={styles.inputContainer}
        />
        {renderList()}
      </View>
    </KeyboardDismiss>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  containerStyle: {
    backgroundColor: theme.color.background
  },
  inputContainer: {
    backgroundColor: theme.color.accent,
    borderRadius: 25,
    paddingLeft: '3%',
    borderBottomWidth: 0
  },
  text: {
    color: theme.color.tertiary
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

UserSearchList.propTypes = {
  styleProps: PropTypes.object,
  value: PropTypes.string,
  onChangeText: PropTypes.func,
  followSelected: PropTypes.array,
  selected: PropTypes.array,
  onItemPress: PropTypes.func,
  onFollowPress: PropTypes.func
}

export default UserSearchList
