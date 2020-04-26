import React, { useContext, useState } from 'react'
import { Route } from '@context/routeStore'
import useSearch, { actions } from '@context/searchContext'
import useSearchQuery from '@graphql/search/useSearchQuery'
import { useDebounce } from '@hooks/useDebounce'
import PropTypes from 'prop-types'

import { theme } from '@src/theme'
import { View, StyleSheet, FlatList, Text, RefreshControl } from 'react-native'
import { ListItem, Image } from 'react-native-elements'
import { Loading } from '@common'
import { EVENT_CONST } from '@util/constants'
import { formatDateTime } from '@util'

const SearchEventList = ({ text }) => {
  const [refreshing, setRefreshing] = useState(false)
  const routeDispatch = useContext(Route.Dispatch)
  const { dispatch } = useSearch()

  const { data, loading, refetch } = useSearchQuery()
  useDebounce(
    () => dispatch({ type: actions.updateQuery, payload: text }),
    1500,
    text
  )

  if (loading) return <Loading />
  if (refreshing) setRefreshing(false)

  if (!data || !data.search.length) {
    return (
      <View style={styles.noResults}>
        <Text style={[styles.text, styles.noResultsText]}>
          No search results found
        </Text>
      </View>
    )
  }

  const handleRefresh = () => {
    setRefreshing(true)
    refetch()
  }

  return (
    <View style={styles.container}>
      <FlatList
        style={{ minHeight: 100 }}
        refreshControl={
          <RefreshControl
            onRefresh={handleRefresh}
            refreshing={refreshing}
            title='Pull to Refresh'
            titleColor={theme.color.tertiary}
            tintColor={theme.color.secondary}
          />
        }
        data={[...data.search]}
        keyExtractor={event => event.id}
        ListFooterComponent={<View style={styles.image} />}
        renderItem={({ item }) => {
          const { id, name, avatar, location, date } = item

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
                />
              }
              containerStyle={styles.containerStyle}
              onPress={() =>
                routeDispatch({
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

SearchEventList.propTypes = {
  text: PropTypes.string
}

export default SearchEventList