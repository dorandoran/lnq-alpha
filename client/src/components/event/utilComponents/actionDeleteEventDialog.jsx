import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import useDeleteEvent from '@graphql/event/useDeleteEvent'

import { theme } from '@src/theme'
import { TouchableOpacity, StyleSheet, View, Text } from 'react-native'
import { Icon } from 'react-native-elements'

const ActionDeleteEventDialog = ({ onComplete, id }) => {
  const deleteEvent = useDeleteEvent()

  const handleConfirm = () => {
    deleteEvent({ id })
    onComplete()
  }

  return (
    <Fragment>
      <View style={styles.messageContainer}>
        <Text style={styles.message}>
          Are you sure you want to delete this event?
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.iconContainer} onPress={onComplete}>
          <Icon
            type='ionicon'
            name='md-close'
            color={theme.color.error}
            reverse
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconContainer} onPress={handleConfirm}>
          <Icon
            type='ionicon'
            name='md-checkmark'
            color={theme.color.success}
            reverse
          />
        </TouchableOpacity>
      </View>
    </Fragment>
  )
}

const styles = StyleSheet.create({
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

ActionDeleteEventDialog.propTypes = {
  id: PropTypes.string,
  onComplete: PropTypes.func
}

export default ActionDeleteEventDialog
