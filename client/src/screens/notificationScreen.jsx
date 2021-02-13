import React from 'react'

import { View, StyleSheet, Text } from 'react-native'
import NotificationTabs from '@components/profile/utilComponents/notificationTabs'
import { NOTIFICATION_TABS } from '@components/profile/utilComponents/profileUtil'
import { Header, HeaderButton } from '@common'
import { theme, goBack } from '@util'

const ProfileNotifications = () => {
  const [tab, setTab] = React.useState(NOTIFICATION_TABS.ALL)

  const handleBackPress = () => {
    goBack()
  }

  return (
    <View style={styles.container}>
      <Header position='relative' backgroundColor='background'>
        <HeaderButton
          type='material'
          name='chevron-left'
          color='tertiary'
          backgroundColor='shadow'
          onPress={handleBackPress}
          size={30}
        />
        <Text style={styles.header}>{tab}</Text>
      </Header>
      <NotificationTabs currentTab={tab} setTab={setTab} />
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
