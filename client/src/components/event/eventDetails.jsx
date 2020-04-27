import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { theme } from '@src/theme'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Icon } from 'react-native-elements'

import EventTicketInfo from '@components/event/eventTicketInfo'
import EventComments from '@components/event/eventComments'
import { adjustedScreenHeight } from '@components/event/utilComponents/eventUtil'

const EventDetails = ({ event, styleProps }) => {
  const [isComments, setIsComments] = useState(false)

  const activeButton = {
    backgroundColor: theme.color.secondary,
    borderWidth: 0
  }

  return (
    <View style={[styles.container, styleProps]}>
      <Text style={[styles.text, styles.name]}>{event.name}</Text>
      <Text style={styles.text}>{`@${event.owner.username}`}</Text>
      <View style={styles.iconView}>
        <TouchableOpacity
          style={[styles.iconContainer, isComments ? null : activeButton]}
          onPress={() => setIsComments(false)}
        >
          <Icon type='ionicon' name='ios-more' color={theme.color.tertiary} />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.iconContainer, isComments ? activeButton : null]}
          onPress={() => setIsComments(true)}
        >
          <Icon type='ionicon' name='ios-text' color={theme.color.tertiary} />
        </TouchableOpacity>
      </View>
      {isComments ? <EventComments /> : <EventTicketInfo event={event} />}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    height: adjustedScreenHeight
  },
  text: {
    color: theme.color.tertiary,
    fontWeight: 'bold',
    marginTop: '3%'
  },
  name: {
    fontSize: 30
  },
  iconView: {
    width: '80%',
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  iconContainer: {
    padding: 10,
    borderRadius: 25,
    aspectRatio: 1,
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: theme.color.tertiary,
    backgroundColor: theme.color.background
  }
})

EventDetails.propTypes = {
  event: PropTypes.object,
  styleProps: PropTypes.object
}

export default EventDetails
