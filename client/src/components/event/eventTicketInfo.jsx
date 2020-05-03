import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

import useOverlay from '@context/overlayContext'

import { theme } from '@util'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Icon, ListItem, Button } from 'react-native-elements'
import { HeaderButton } from '@common'

import { eventDetails } from '@components/event/utilComponents/eventUtil'

const EventTicketInfo = ({ event, edit, updateKey }) => {
  const { dispatch, actions } = useOverlay()

  const handlePress = (key, additionalKeys) => {
    if (edit) {
      dispatch({
        type: actions.dialog.events.update,
        payload: { key, additionalKeys, event, updateKey }
      })
    }
  }

  const handleDeleteEvent = () => {
    dispatch({ type: actions.dialog.events.delete })
  }

  if (!event) return null

  return (
    <View style={styles.container}>
      {eventDetails.map(
        ({
          key,
          additionalKeys,
          title,
          iconName,
          rightTitle,
          rightIconType,
          rightIconName
        }) => {
          const hideUntilEdit = ['name', 'delete']
          // In edit mode, event name moves into the component
          if (!edit && hideUntilEdit.includes(key)) return null
          if (key === 'delete') {
            return (
              <TouchableOpacity
                key={key}
                style={styles.editListItem}
                onPress={() => handleDeleteEvent()}
              >
                <HeaderButton
                  type='material-community'
                  name={iconName}
                  color='tertiary'
                  backgroundColor='secondary'
                />
                <Text style={[styles.text, styles.name, styles.marginLeft]}>
                  {title()}
                </Text>
              </TouchableOpacity>
            )
          }

          return (
            <ListItem
              key={key}
              containerStyle={styles.listItem}
              onPress={() => handlePress(key, additionalKeys)}
              titleStyle={[
                styles.text,
                hideUntilEdit.includes(key) ? styles.name : null
              ]}
              title={title(event)}
              leftIcon={
                iconName && (
                  <HeaderButton
                    type='material-community'
                    name={iconName}
                    color='tertiary'
                    borderColor={edit ? 'secondary' : 'background'}
                    onPress={() => handlePress(key, additionalKeys)}
                  />
                )
              }
              rightTitleStyle={styles.text}
              rightTitle={rightTitle && rightTitle(event)}
              rightIcon={
                rightIconName && (
                  <HeaderButton
                    type={rightIconType || 'material-community'}
                    name={rightIconName(event)}
                    color='tertiary'
                    borderColor={edit ? 'secondary' : 'background'}
                    onPress={() => handlePress(key, additionalKeys)}
                  />
                )
              }
            />
          )
        }
      )}

      {!edit && (
        <Fragment>
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
        </Fragment>
      )}
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
  marginLeft: {
    marginLeft: '5%'
  },
  editListItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    padding: 5,
    marginHorizontal: '20%',
    borderColor: theme.color.tertiary,
    borderWidth: 2,
    backgroundColor: theme.color.background
  },
  text: {
    color: theme.color.tertiary,
    fontSize: 18
  },
  name: {
    fontWeight: 'bold',
    fontSize: 20
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
  event: PropTypes.object,
  edit: PropTypes.bool,
  updateKey: PropTypes.func
}

export default EventTicketInfo
