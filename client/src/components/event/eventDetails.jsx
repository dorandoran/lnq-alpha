import React, { useState } from 'react'
import isEqual from 'lodash/isEqual'
import PropTypes from 'prop-types'

import useNotification from '@hooks/useNotification'
import useUpdateEvent from '@graphql/event/useUpdateEvent'

import EventTicketInfo from '@components/event/eventTicketInfo'
import EventComments from '@components/event/eventComments'

import { View, Text, StyleSheet } from 'react-native'
import { Icon } from 'react-native-elements'
import { HeaderButton } from '@common'
import { theme } from '@util'
import {
  adjustedScreenHeight,
  getEventUpdates
} from '@components/event/utilComponents/eventUtil'

const EventDetails = ({ event, edit, setEdit, canEdit }) => {
  const [isComments, setIsComments] = useState(false)
  // TODO: Throw Info
  const { throwLoading, throwSuccess } = useNotification()
  const [updateEvent] = useUpdateEvent({
    onCompleted: () => {
      throwSuccess('Event updated and edit mode disabled')
      setEdit(null)
    }
  })

  const handleEdit = () => {
    if (edit) {
      setEdit(null)
      throwSuccess('Edit mode disabled with no changes made')
    } else {
      setEdit(event)
      throwSuccess('Edit mode enabled')
    }
  }

  const updateKey = ({ key, value }) => {
    if (['isPrivate', 'type', 'plusOne'].includes(key)) {
      setEdit({ ...edit, ...value })
    } else {
      setEdit({ ...edit, [key]: value })
    }
  }

  const handleConfirmEdit = () => {
    throwLoading()
    updateEvent({ id: event.id, updates: getEventUpdates(edit) })
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.sideContainer} />

        <View style={styles.middleContainer}>
          <Text style={[styles.text, styles.name]}>{event.name}</Text>
          <Text style={styles.text}>{`@${event.owner.username}`}</Text>
          <View style={styles.iconView}>
            <Icon
              type='ionicon'
              name='ios-more'
              color={!isComments ? theme.color.secondary : theme.color.accent}
              reverseColor={theme.color.tertiary}
              reverse
              onPress={() => setIsComments(false)}
            />
            <Icon
              type='ionicon'
              name='ios-text'
              color={isComments ? theme.color.secondary : theme.color.accent}
              reverse
              disabled={!!edit}
              onPress={() => setIsComments(true)}
            />
          </View>
        </View>
        <View style={styles.sideContainer}>
          {canEdit &&
            (edit ? (
              <View>
                <HeaderButton
                  type='ionicon'
                  name='md-close'
                  backgroundColor='error'
                  color='tertiary'
                  onPress={handleEdit}
                  containerStyle={styles.editButton}
                />
                <HeaderButton
                  type='ionicon'
                  name='md-checkmark'
                  backgroundColor='success'
                  color='tertiary'
                  onPress={handleConfirmEdit}
                  containerStyle={styles.editButton}
                  disabled={isEqual(event, edit)}
                />
              </View>
            ) : (
              <HeaderButton
                type='material-community'
                name='pencil-outline'
                backgroundColor='accent'
                color='tertiary'
                onPress={handleEdit}
                containerStyle={styles.editButton}
              />
            ))}
        </View>
      </View>
      {isComments ? (
        <EventComments />
      ) : (
        <EventTicketInfo
          event={edit || event}
          edit={!!edit}
          updateKey={updateKey}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    height: adjustedScreenHeight
  },
  headerContainer: {
    flexDirection: 'row',
    borderBottomWidth: 2,
    borderColor: theme.color.accent
  },
  middleContainer: {
    width: '70%',
    alignItems: 'center'
  },
  sideContainer: {
    width: '15%',
    alignItems: 'center'
  },
  text: {
    color: theme.color.tertiary,
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: '3%'
  },
  name: {
    marginTop: '5%',
    fontSize: 26,
    textAlign: 'center'
  },
  iconView: {
    width: '80%',
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  editButton: {
    marginTop: 15
  }
})

EventDetails.propTypes = {
  event: PropTypes.object,
  edit: PropTypes.object,
  setEdit: PropTypes.func,
  canEdit: PropTypes.bool
}

export default EventDetails
