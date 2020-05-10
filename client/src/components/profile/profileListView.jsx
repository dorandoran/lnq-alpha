import React from 'react'
import { StyleSheet, FlatList } from 'react-native'
import ProfileListViewCard from '@components/profile/profileListViewCard'

const ProfileListView = () => {
  // eslint-disable-next-line no-undef
  const imageLink = require('../../../assets/profile-main.png')
  const myData = [
    {
      eventTime: 'May 01, 2020',
      eventLocation: 'washington dc',
      eventName: 'Open Bar',
      imageLink
    },
    {
      eventTime: 'May 01, 2020',
      eventLocation: 'washington dc',
      eventName: 'Concert',
      imageLink
    },
    {
      eventTime: 'May 01, 2020',
      eventLocation: 'washington dc',
      eventName: 'Happy Hour',
      imageLink
    },
    {
      eventTime: 'May 01, 2020',
      eventLocation: 'washington dc',
      eventName: 'Party',
      imageLink
    },
    {
      eventTime: 'May 01, 2020',
      eventLocation: 'washington dc',
      eventName: 'Game',
      imageLink
    },
    {
      eventTime: 'May 01, 2020',
      eventLocation: 'washington dc',
      eventName: 'E-Sports',
      imageLink
    },
    {
      eventTime: 'May 01, 2020',
      eventLocation: 'washington dc',
      eventName: 'Movie and Dinner',
      imageLink
    },
    {
      eventTime: 'May 01, 2020',
      eventLocation: 'washington dc',
      eventName: 'Christmas',
      imageLink
    },
    {
      eventTime: 'May 01, 2020',
      eventLocation: 'washington dc',
      eventName: 'BBQ',
      imageLink
    },
    {
      eventTime: 'May 01, 2020',
      eventLocation: 'washington dc',
      eventName: 'Birthday',
      imageLink
    }
  ]

  const profileListViewCardHandler = item => {
    return (
      <ProfileListViewCard
        dataName={item.eventName}
        dataLocation={item.eventLocation}
        dataTime={item.eventTime}
        avatarImage={item.imageLink}
      />
    )
  }

  return (
    <FlatList
      keyExtractor={item => item.eventName}
      data={myData}
      renderItem={({ item }) => profileListViewCardHandler(item)}
      showsVerticalScrollIndicator={false}
    />
  )
}

const styles = StyleSheet.create({})

export default ProfileListView
