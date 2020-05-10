import React from 'react'
import PropTypes from 'prop-types'

import useOverlay from '@context/overlayContext'

import { theme } from '@util'
import { View, Text, StyleSheet } from 'react-native'
import { Icon, ListItem, Button } from 'react-native-elements'
import { HeaderButton } from '@common'

import { eventDetails } from '@components/event/utilComponents/eventUtil'

const EventTicketInfo = ({ event }) => {
  const { dispatch, actions } = useOverlay()

  const handlePress = key => {
    dispatch({
      type: actions.dialog.events.updateEvent,
      payload: { key, event }
    })
  }

  return (
    <View style={styles.container}>
      {eventDetails.map(({ key, title, iconName }) => {
        return (
          <ListItem
            key={key}
            containerStyle={styles.listItem}
            titleStyle={styles.text}
            title={title(event)}
            leftIcon={
              iconName && (
                <HeaderButton
                  type='material-community'
                  name={iconName}
                  color='tertiary'
                  backgroundColor='secondary'
                  onPress={() => handlePress(key)}
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
    paddingVertical: '3%'
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
    width: '90%',
    alignSelf: 'center',
    paddingBottom: '2%'
  }
})

EventTicketInfo.propTypes = {
  event: PropTypes.object
}

export default EventTicketInfo
