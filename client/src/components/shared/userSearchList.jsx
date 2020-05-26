import React from 'react'
import PropTypes from 'prop-types'

import { useDebounce } from '@hooks/useDebounce'
import { useQuery } from '@apollo/react-hooks'
import { UserSearch } from '@graphql/search/queries'
import useUser from '@context/userContext'

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
  onItemPress,
  buttonLabel = 'Follow'
}) => {
  const [text, setText] = React.useState('')
  const user = useUser()
  const variables = {
    query: text,
    filters: `NOT id:${user.id}`
  }
  const { data, loading } = useQuery(UserSearch, { variables })

  useDebounce(() => setText(value), 1000, value)

  const renderList = () => {
    if (loading) return <Loading position='top' />
    if (!data?.search?.length) {
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
        data={[...data.search]}
        onItemPress={onItemPress}
        selected={selected}
        actionLabel={buttonLabel}
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
  selected: PropTypes.array,
  onItemPress: PropTypes.func,
  buttonLabel: PropTypes.string
}

export default UserSearchList
