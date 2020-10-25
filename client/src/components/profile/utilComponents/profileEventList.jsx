import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, Text, View } from 'react-native'

import { useQuery } from '@apollo/client'
import { GetCurrentUserEvents } from '@graphql/user/queries'

import EventList from '@components/shared/itemList'

import { Loading } from '@common'
import { theme } from '@util'

const ProfileEventList = ({ skip }) => {
  const [refreshing, setRefreshing] = React.useState(false)

  const { data, loading, refetch } = useQuery(GetCurrentUserEvents, {
    fetchPolicy: 'cache-and-network',
    skip
  })
  // eslint-disable-next-line quotes
  const noEvents = "You haven't created any events yet!"

  const handleRefresh = () => {
    setRefreshing(true)
    refetch()
  }

  if (loading) return <Loading position='top' />
  if (refreshing) setRefreshing(false)
  if (!data?.user.events || !data.user.events.length) {
    return (
      <View style={styles.noResults}>
        <Text style={[styles.text, styles.noResultsText]}>{noEvents}</Text>
      </View>
    )
  }

  return (
    <EventList
      data={data.user.events}
      onItemPress={() => { }}
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

ProfileEventList.propTypes = {
  skip: PropTypes.bool
}

export default ProfileEventList
