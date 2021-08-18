import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { GetFollowing, GetFollowers } from '@graphql/follow/queries'

import ItemList from '@components/shared/itemList'
import { View, StyleSheet } from 'react-native'
import { Tabs } from '@common'
import { SCREEN } from '@components/profile/utilComponents/profileUtil'
import { theme, BUCKET } from '@util'

const ProfileFollowList = ({ initialTab }) => {
  const [currentTab, setCurrentTab] = useState(initialTab)
  const filterFollowerList = list => list.map(follow => follow.sender)
  const filterFollowingList = list => list.map(follow => follow.recipient)

  const TABS = {
    [SCREEN.FOLLOWERS]: {
      label: 'Followers',
      query: GetFollowers,
      noDataMessage: 'No followers, yet!',
      filterList: filterFollowerList,
      handleItemPress: () => {}
    },
    [SCREEN.FOLLOWING]: {
      label: 'Following',
      query: GetFollowing,
      noDataMessage: 'Not following anyone, yet!',
      filterList: filterFollowingList,
      handleItemPress: () => {}
    }
  }
  const tabList = [TABS[SCREEN.FOLLOWERS].label, TABS[SCREEN.FOLLOWING].label]

  return (
    <View style={styles.container}>
      <Tabs tabs={tabList} currentTab={currentTab} setTab={setCurrentTab} />
      <ItemList
        type={BUCKET.USER}
        query={TABS[currentTab].query}
        noDataMessage={TABS[currentTab].noDataMessage}
        filterList={TABS[currentTab].filterList}
        onItemPress={TABS[currentTab].handleItemPress}
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

ProfileFollowList.propTypes = {
  initialTab: PropTypes.string
}

export default ProfileFollowList
