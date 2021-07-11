import React, { useState } from 'react'
import isEmpty from 'lodash/isEmpty'
import PropTypes from 'prop-types'

import useNotification from '@hooks/useNotification'
import useUpdateEvent from '@graphql/event/useUpdateEvent'

import EventTicketInfo from '@components/event/eventTicketInfo'
import EventCommentContainer from '@components/event/eventCommentContainer'

import { View, Text, StyleSheet } from 'react-native'
import { Icon } from 'react-native-elements'
import { HeaderButton } from '@common'
import { theme } from '@util'
import { adjustedScreenHeight } from '@components/event/utilComponents/eventUtil'

const EventDetails = ({
  event,
  edit,
  modalActions,
  editActions,
  permissions
}) => {
  const [isComments, setIsComments] = useState(false)
  // TODO: Throw Info
  const { throwLoading, throwSuccess } = useNotification()
  const [updateEvent] = useUpdateEvent({
    onCompleted: () => {
      throwSuccess('Event updated and edit mode disabled')
      editActions.disableEdit()
    }
  })

  const handleEnableEdit = () => {
    editActions.enableEdit()
    throwSuccess('Edit mode enabled. Select a field to edit')
  }

  const handleDisableEdit = () => {
    throwSuccess('Edit mode disabled with no changes made')
    editActions.disableEdit()
  }

  const handleConfirmEdit = () => {
    throwLoading()
    updateEvent({ id: event.id, updates: edit.updates })
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
              type='material-community'
              name='dots-horizontal'
              color={!isComments ? theme.color.secondary : theme.color.accent}
              reverseColor={theme.color.tertiary}
              reverse
              onPress={() => setIsComments(false)}
            />
            <Icon
              type='material-community'
              name='message-reply'
              color={isComments ? theme.color.secondary : theme.color.accent}
              reverse
              disabled={edit.enabled}
              onPress={() => setIsComments(true)}
            />
          </View>
        </View>
        <View style={styles.sideContainer}>
          {permissions.canEditEvent &&
            !isComments &&
            (edit.enabled ? (
              <View>
                <HeaderButton
                  type='ionicon'
                  name='md-close'
                  backgroundColor='error'
                  color='tertiary'
                  onPress={handleDisableEdit}
                  containerStyle={styles.editButton}
                />
                <HeaderButton
                  type='ionicon'
                  name='md-checkmark'
                  backgroundColor='success'
                  color='tertiary'
                  onPress={handleConfirmEdit}
                  containerStyle={styles.editButton}
                  disabled={isEmpty(edit.updates)}
                />
              </View>
            ) : (
              <HeaderButton
                type='material-community'
                name='pencil-outline'
                backgroundColor='accent'
                color='tertiary'
                onPress={handleEnableEdit}
                containerStyle={styles.editButton}
              />
            ))}
        </View>
      </View>
      {isComments ? (
        <EventCommentContainer event={event} />
      ) : (
        <EventTicketInfo
          event={event}
          updates={edit.updates}
          editEnabled={edit.enabled}
          modalActions={modalActions}
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
  modalActions: PropTypes.object,
  editActions: PropTypes.object,
  permissions: PropTypes.object
}

export default EventDetails
