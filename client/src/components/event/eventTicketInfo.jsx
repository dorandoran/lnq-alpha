import React from 'react'
import PropTypes from 'prop-types'
import dayjs from 'dayjs'

import { theme } from '@src/theme'
import { View, Text, StyleSheet } from 'react-native'
import { Icon, ListItem } from 'react-native-elements'
import { DATE_FORMAT, TIME_FORMAT } from '@components/util/constants'

const EventTicketInfo = ({ event }) => {
  const { location, date, description } = event

  return (
    <View style={{ width: '100%' }}>
      <ListItem
        containerStyle={{ backgroundColor: theme.color.background }}
        titleStyle={styles.color}
        title={location}
        leftIcon={
          <Icon
            type="material-community"
            name="map-marker-outline"
            color={theme.color.tertiary}
          />
        }
      />
      <ListItem
        containerStyle={{ backgroundColor: theme.color.background }}
        titleStyle={styles.color}
        title={dayjs(date).format(`${DATE_FORMAT}  |  ${TIME_FORMAT}`)}
        leftIcon={
          <Icon
            type="material-community"
            name="clock-outline"
            color={theme.color.tertiary}
          />
        }
      />
      <Text style={[styles.color, styles.text]}>{description}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  color: {
    color: theme.color.tertiary
  },
  text: {
    fontSize: 16,
    marginLeft: '5%'
  }
})

EventTicketInfo.propTypes = {
  event: PropTypes.object
}

export default EventTicketInfo
