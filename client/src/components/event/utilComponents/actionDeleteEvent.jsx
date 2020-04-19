import React, { useContext } from 'react'
import NotificationContext from '@context/notificationContext'
import PropTypes from 'prop-types'
import useDeleteEvent from '@graphql/event/useDeleteEvent'

import { theme } from '@src/theme'
import { TouchableOpacity, StyleSheet, View, Text } from 'react-native'
import { Icon } from 'react-native-elements'

const ActionDeleteEvent = ({ id, onComplete }) => {
  const { showSpeedBump, hideSpeedBump } = useContext(NotificationContext)
  const deleteEvent = useDeleteEvent()

  const handleConfirm = () => {
    deleteEvent({ id })
    onComplete()
    hideSpeedBump()
  }

  const handlePress = () => {
    showSpeedBump(
      <View style={styles.speedBumpContainer}>
        <View style={styles.messageContainer}>
          <Text style={styles.message}>
            Are you sure you want to delete this event?
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.iconContainer}
            onPress={hideSpeedBump}
          >
            <Icon
              type='ionicon'
              name='md-close'
              color={theme.color.error}
              reverse
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.iconContainer}
            onPress={handleConfirm}
          >
            <Icon
              type='ionicon'
              name='md-checkmark'
              color={theme.color.success}
              reverse
            />
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      <Icon
        type='material-community'
        name='close'
        color={theme.color.tertiary}
      />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 25,
    aspectRatio: 1,
    justifyContent: 'center'
  },
  speedBumpContainer: {
    backgroundColor: theme.color.accent,
    borderRadius: 25,
    alignItems: 'center',
    padding: '3%'
  },
  messageContainer: {
    padding: '5%'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  iconContainer: {
    paddingLeft: '10%',
    paddingRight: '10%'
  },
  message: {
    textAlign: 'center',
    fontSize: 24,
    color: theme.color.tertiary
  }
})

ActionDeleteEvent.propTypes = {
  id: PropTypes.string,
  onComplete: PropTypes.func
}

export default ActionDeleteEvent
