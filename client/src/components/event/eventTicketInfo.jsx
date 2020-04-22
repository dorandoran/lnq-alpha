import React from 'react'
import PropTypes from 'prop-types'

import { theme } from '@src/theme'
import { View, Text, StyleSheet } from 'react-native'
import { Icon, ListItem, Button } from 'react-native-elements'

import { detailsMap } from '@components/event/utilComponents/eventUtil'

const EventTicketInfo = ({ event }) => {
  return (
    <View style={styles.container}>
      {detailsMap.map(({ key, title, iconName }) => {
        if (key === 'description') {
          return (
            <Text key={key} style={[styles.text, styles.margins]}>
              {event.description}
            </Text>
          )
        }

        return (
          <ListItem
            key={key}
            containerStyle={styles.listItem}
            titleStyle={styles.text}
            title={title(event)}
            leftIcon={
              iconName && (
                <Icon
                  type='material-community'
                  name={iconName}
                  color={theme.color.tertiary}
                />
              )
            }
          />
        )
      })}

      <View style={styles.buttonContainer}>
        <Button title='Tickets' buttonStyle={styles.button} />
      </View>

      <Text style={styles.similarEventText}>Similar Events</Text>

      <ListItem
        containerStyle={styles.listItem}
        titleStyle={styles.text}
        title='No similar events found...'
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
  buttonContainer: {
    marginTop: '5%',
    marginBottom: '3%'
  },
  listItem: {
    backgroundColor: theme.color.background
  },
  text: {
    color: theme.color.tertiary,
    fontSize: 18
  },
  similarEventText: {
    color: theme.color.tertiary,
    fontSize: 25,
    fontWeight: 'bold',
    marginTop: '5%',
    marginLeft: '4%'
  },
  margins: {
    marginLeft: '4%',
    marginBottom: '2%',
    marginTop: '2%'
  },
  button: {
    borderRadius: 25,
    backgroundColor: theme.color.secondary,
    width: '95%',
    alignSelf: 'center'
  }
})

EventTicketInfo.propTypes = {
  event: PropTypes.object
}

export default EventTicketInfo