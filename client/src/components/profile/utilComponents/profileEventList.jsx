import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, Text, View } from 'react-native'

import { useQuery } from '@apollo/client'
import { GetCurrentUserEvents } from '@graphql/user/queries'
import useOverlay from '@context/overlayContext'
import useUser from '@context/userContext'

import EventList from '@components/shared/itemList'

import { Loading } from '@common'
import { theme, BUCKET } from '@util'

const ProfileEventList = ({ skip }) => {
  const [refreshing, setRefreshing] = React.useState(false)
  const { dispatch, actions } = useOverlay()
  const { id } = useUser()

  const { data, loading, refetch } = useQuery(GetCurrentUserEvents, {
    variables: { id },
    fetchPolicy: 'cache-and-network',
    skip
  })

  const noEvents = "You haven't created any events yet!"

  const handleRefresh = () => {
    setRefreshing(true)
    refetch()
  }

  if (loading) return <Loading position='top' />
  if (refreshing) setRefreshing(false)
  if (!data?.getUserEvents || !data.getUserEvents.length) {
    return (
      <View style={styles.noResults}>
        <Text style={[styles.text, styles.noResultsText]}>{noEvents}</Text>
      </View>
    )
  }

  const handleItemPress = item => {
    dispatch({
      type: actions.modal.open,
      payload: { data: item, type: BUCKET.EVENT }
    })
  }

  return (
    <EventList
      data={data.getUserEvents}
      onItemPress={handleItemPress}
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
