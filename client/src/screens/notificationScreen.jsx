import React, { useState } from 'react'
import { GetUserNotifications } from '@graphql/notifications/queries'
import { View, StyleSheet, Text } from 'react-native'

import SocialItemList from '@components/shared/socialItemList'
import { Header, HeaderButton, Tabs } from '@common'
import { theme, goBack } from '@util'

const ProfileNotifications = () => {
  const [currentTab, setCurrentTab] = useState()
  const handleBackPress = () => {
    goBack()
  }

  // Create new list component - datedItemList
  // Based on itemList
  // Accounts for the date and separates with divider (toggle?)
  // Allows for social link answers
  // Make it work
  const TABS = {
    ALL: {
      label: 'All',
      filterList: null,
      noDataMessage: 'No notifications to show',
      handleItemPress: () => {}
    },
    INVITES: {
      label: 'Invites',
      filterList: list => list.filter(item => item.type === 'INVITE'),
      noDataMessage: 'No invites to show',
      handleItemPress: () => {}
    }
  }
  const tabList = Object.keys(TABS).map(tab => TABS[tab].label)

  return (
    <View style={styles.container}>
      <Header position='relative' backgroundColor='background'>
        <Tabs tabs={tabList} />
        <HeaderButton
          type='material'
          name='chevron-left'
          color='tertiary'
          backgroundColor='shadow'
          onPress={handleBackPress}
          size={30}
        />
        <Text style={styles.header}>Notifications</Text>
      </Header>
      <SocialItemList
        query={GetUserNotifications}
        noDataMessage='No data!'
        onItemPress={() => {}}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.color.background
  },
  header: {
    color: theme.color.tertiary,
    fontWeight: 'bold',
    fontSize: 18
  }
})

export default ProfileNotifications
