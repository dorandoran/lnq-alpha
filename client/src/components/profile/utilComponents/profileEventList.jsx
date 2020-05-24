import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { useQuery } from '@apollo/react-hooks'
import { GetCurrentUserEvents } from '@graphql/user/queries.js'

import EventList from '@components/shared/eventList'

import { Loading } from '@common'
import { theme } from '@util'

const ProfileEventList = () => {
  const [refreshing, setRefreshing] = React.useState(false)
  const { data, loading, refetch } = useQuery(GetCurrentUserEvents, {
    fetchPolicy: 'cache-and-network'
  })
  // eslint-disable-next-line quotes
  const noEvents = "You haven't created any events yet!"

  if (loading) return <Loading position='top' />
  if (refreshing) setRefreshing(false)
  if (!data?.user.events || !data.user.events.length) {
    return (
      <View style={styles.noResults}>
        <Text style={[styles.text, styles.noResultsText]}>{noEvents}</Text>
      </View>
    )
  }

  const handleRefresh = () => {
    setRefreshing(true)
    refetch()
  }

  return (
    <EventList
      data={data.user.events}
      onEventPress={() => {}}
      hideAvatar
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

export default ProfileEventList
