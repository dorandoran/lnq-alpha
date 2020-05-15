import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Button } from 'react-native-elements'
import { SCREEN_WIDTH } from '@util'

const ProfileTab = () => {
  return (
    <View style={styles.listContentStyleTab}>
      <Button title='Events' buttonStyle={styles.eventTabStyle} />
      <Button title='RVSP' buttonStyle={styles.rvspTabStyle} />
      <Button title='Saves' buttonStyle={styles.savesTabStyle} />
    </View>
  )
}

const styles = StyleSheet.create({
  listContentStyleTab: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 16
  },
  eventTabStyle: {
    backgroundColor: 'red',
    width: SCREEN_WIDTH / 3,
    borderTopLeftRadius: 25,
    borderBottomLeftRadius: 25
  },
  rvspTabStyle: {
    width: SCREEN_WIDTH / 3,
    backgroundColor: '#333'
  },
  savesTabStyle: {
    width: SCREEN_WIDTH / 3,
    borderTopRightRadius: 25,
    borderBottomRightRadius: 25,
    backgroundColor: '#333'
  }
})

export default ProfileTab
