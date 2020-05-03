import React, { Fragment, useState } from 'react'
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
      throwSuccess('Event updated and edit mode closed.')
      setEdit(null)
    }
  })

  const handleEdit = () => {
    if (edit) {
      setEdit(null)
      throwSuccess('Edit mode closed.')
    } else {
      setEdit(event)
      throwSuccess('Edit mode enabled.')
    }
  }

  const updateKey = ({ key, value }) => {
    if (typeof value === 'object') {
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
      {edit ? (
        // Edit On
        <Fragment>
          <View style={[styles.editContainer, styles.edit]}>
            <Text style={[styles.text, styles.editText]}>Save changes?</Text>
            <View style={styles.iconView}>
              <Icon
                type='ionicon'
                name='md-close'
                color={theme.color.error}
                reverseColor={theme.color.tertiary}
                reverse
                onPress={handleEdit}
              />
              <Icon
                type='ionicon'
                name='md-checkmark'
                color={theme.color.success}
                disabled={isEqual(event, edit)}
                reverse
                onPress={handleConfirmEdit}
              />
            </View>
          </View>
        </Fragment>
      ) : (
        // Edit Off
        <Fragment>
          {canEdit && (
            <HeaderButton
              type='material-community'
              name='pencil-outline'
              borderColor='secondary'
              color='tertiary'
              onPress={handleEdit}
              containerStyle={styles.editButton}
            />
          )}
          <Text style={[styles.text, styles.name]}>{event.name}</Text>
          <View style={styles.editContainer}>
            <Text style={styles.text}>{`@${event.owner.username}`}</Text>
            <View style={styles.iconView}>
              <Icon
                type='ionicon'
                name='ios-more'
                color={
                  !isComments ? theme.color.secondary : theme.color.background
                }
                reverseColor={theme.color.tertiary}
                reverse={!isComments}
                raised={isComments}
                onPress={() => setIsComments(false)}
              />
              <Icon
                type='ionicon'
                name='ios-text'
                color={
                  isComments ? theme.color.secondary : theme.color.background
                }
                reverse={isComments}
                raised={!isComments}
                onPress={() => setIsComments(true)}
              />
            </View>
          </View>
        </Fragment>
      )}
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
  editContainer: {
    width: '70%',
    alignItems: 'center',
    borderColor: theme.color.tertiary
  },
  edit: {
    marginTop: '2%',
    borderRadius: 25,
    borderWidth: 2
  },
  text: {
    color: theme.color.tertiary,
    fontWeight: 'bold',
    marginTop: '3%'
  },
  editText: {
    fontSize: 18
  },
  name: {
    fontSize: 30
  },
  iconView: {
    width: '80%',
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  editButton: {
    position: 'absolute',
    top: 15,
    right: 15
  }
})

EventDetails.propTypes = {
  event: PropTypes.object,
  edit: PropTypes.object,
  setEdit: PropTypes.func,
  canEdit: PropTypes.bool
}

export default EventDetails
