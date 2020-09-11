import React from 'react'

import { View, StyleSheet } from 'react-native'
import NotificationTabs from '@components/profile/utilComponents/notificationTabs'
import { NOTIFICATION_TABS } from '@components/profile/utilComponents/profileUtil'

const ProfileNotifications = () => {
  const [tab, setTab] = React.useState(NOTIFICATION_TABS.ALL)

  return (
    <View style={styles.container}>
      <NotificationTabs currentTab={tab} setTab={setTab} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})

export default ProfileNotifications
