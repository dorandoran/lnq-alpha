import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { useQuery } from '@apollo/react-hooks'
import { GetRSVP } from '@graphql/invite/queries.js'

import { Loading } from '@common'
import { theme } from '@util'

const ProfileResponseList = () => {
  const { data, loading } = useQuery(GetRSVP, {
    fetchPolicy: 'cache-and-network'
  })
  const noResponses = 'No RSVPs to show.'

  if (loading) return <Loading position='top' />
  console.log(data)

  // if (!data?.user.events) {
  return (
    <View style={styles.noResults}>
      <Text style={[styles.text, styles.noResultsText]}>{noResponses}</Text>
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

export default ProfileResponseList
