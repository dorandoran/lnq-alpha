import React from 'react'
import PropTypes from 'prop-types'

import { View, StyleSheet, TouchableOpacity, Text } from 'react-native'
import { theme } from '@util'
import { notificationTabList } from '@components/profile/utilComponents/profileUtil'

const NotificationTabs = ({ currentTab, setTab }) => {
  const isSelectedStyles = value => {
    if (currentTab === value) {
      return { backgroundColor: theme.color.secondary }
    }
  }

  return (
    <View style={styles.container}>
      {notificationTabList.map(tab => {
        return (
          <TouchableOpacity
            key={tab}
            style={[styles.buttonContainer, isSelectedStyles(tab)]}
            onPress={() => setTab(tab)}
          >
            <Text style={styles.text}>{tab}</Text>
          </TouchableOpacity>
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginTop: 15,
    marginHorizontal: 15,
    backgroundColor: theme.color.accent,
    borderRadius: 25
  },
  buttonContainer: {
    width: '50%',
    paddingVertical: 10,
    borderRadius: 25
  },
  text: {
    color: theme.color.tertiary,
    fontWeight: 'bold',
    textAlign: 'center'
  }
})

NotificationTabs.propTypes = {
  currentTab: PropTypes.string,
  setTab: PropTypes.func
}

export default NotificationTabs
