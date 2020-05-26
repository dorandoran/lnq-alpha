import React, { useState } from 'react'
import PropTypes from 'prop-types'

import useOverlay from '@context/overlayContext'
import useSearch, { actions } from '@context/searchContext'
import useSearchQuery from '@graphql/search/useSearchQuery'
import { useDebounce } from '@hooks/useDebounce'

import EventList from '@components/shared/itemList'
import { View, StyleSheet, Text } from 'react-native'
import { Loading } from '@common'

import { theme, BUCKET } from '@util'

const SearchEventList = ({ text }) => {
  const [refreshing, setRefreshing] = useState(false)
  const { dispatch: overlayDispatch, actions: overlayActions } = useOverlay()
  const { dispatch } = useSearch()

  const { data, loading, refetch } = useSearchQuery()
  useDebounce(
    () => dispatch({ type: actions.updateQuery, payload: text }),
    1500,
    text
  )

  if (loading) return <Loading position='top' />
  if (refreshing) setRefreshing(false)

  if (!data?.search?.length) {
    return (
      <View style={styles.noResults}>
        <Text style={[styles.text, styles.noResultsText]}>
          No search results found
        </Text>
      </View>
    )
  }

  const handleEventPress = item => {
    overlayDispatch({
      type: overlayActions.modal.open,
      payload: { data: item, type: BUCKET.EVENT }
    })
  }

  const handleRefresh = () => {
    setRefreshing(true)
    refetch()
  }

  return (
    <EventList
      data={[...data.search]}
      onItemPress={handleEventPress}
      onRefresh={handleRefresh}
      refreshing={refreshing}
    />
  )
}

const styles = StyleSheet.create({
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

SearchEventList.propTypes = {
  text: PropTypes.string
}

export default SearchEventList
