import React from 'react'

import { theme } from '@util'
import { View, StyleSheet } from 'react-native'
import { Icon, ListItem } from 'react-native-elements'

const EventComments = () => {
  return (
    <View style={styles.container}>
      <ListItem
        containerStyle={styles.listItem}
      >
        <Icon
          type='material-community'
          name='emoticon-cry-outline'
          color={theme.color.tertiary}
        />
        <ListItem.Title style={styles.text}>{'No Comments...'}</ListItem.Title>
      </ListItem>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%'
  },
  listItem: {
    backgroundColor: theme.color.background
  },
  text: {
    color: theme.color.tertiary,
    fontSize: 18
  }
})

export default EventComments
