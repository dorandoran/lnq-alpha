import React from 'react'

import { theme } from '@src/theme'
import { View, StyleSheet } from 'react-native'
import { Icon, ListItem } from 'react-native-elements'

const EventComments = () => {
  return (
    <View style={styles.container}>
      <ListItem
        containerStyle={styles.listItem}
        titleStyle={styles.text}
        title='No Comments...'
        leftIcon={
          <Icon
            type='material-community'
            name='emoticon-cry-outline'
            color={theme.color.tertiary}
          />
        }
      />
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
