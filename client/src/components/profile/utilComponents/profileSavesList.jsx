import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { useQuery } from '@apollo/react-hooks'
// import { GetCurrentUserEvents } from '@graphql/user/queries.js'

import EventList from '@components/shared/itemList'
import { Loading } from '@common'
import { theme } from '@util'

const ProfileSavesList = () => {
  // const { data, loading } = useQuery(GetCurrentUserEvents, {
  //   fetchPolicy: 'cache-and-network'
  // })
  const noSaves = 'Nothing saved.'

  // if (loading) return <Loading />
  // if (!data?.user.events) {
  return (
    <View style={styles.noResults}>
      <Text style={[styles.text, styles.noResultsText]}>{noSaves}</Text>
    </View>
  )
  // }

  // return (
  //   <EventList data={data.user.events} onItemPress={() => {}} hideAvatar />
  // )
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

export default ProfileSavesList
