import React from 'react'
import PropTypes from 'prop-types'

import { View, StyleSheet, TouchableOpacity, Text } from 'react-native'
import { theme } from '@util'
import { tabButtonList } from '@components/profile/utilComponents/profileUtil'

const ProfileTab = ({ currentTab, setTab }) => {
  const isSelectedStyles = value => {
    if (currentTab === value) {
      return { backgroundColor: theme.color.secondary }
    }
  }

  return (
    <View style={styles.container}>
      {tabButtonList.map(tab => {
        return (
          <TouchableOpacity
            key={tab.value}
            style={[styles.buttonContainer, isSelectedStyles(tab.value)]}
            onPress={() => setTab(tab.value)}
          >
            <Text style={styles.text}>{tab.label}</Text>
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
    width: '33.33%',
    paddingVertical: 10,
    borderRadius: 25
  },
  text: {
    color: theme.color.tertiary,
    fontWeight: 'bold',
    textAlign: 'center'
  }
})

ProfileTab.propTypes = {
  currentTab: PropTypes.string,
  setTab: PropTypes.func
}

export default ProfileTab
