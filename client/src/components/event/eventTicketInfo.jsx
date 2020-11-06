import React from 'react'
import PropTypes from 'prop-types'

import { theme } from '@util'
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native'
import { Icon, ListItem, Button } from 'react-native-elements'
import { HeaderButton } from '@common'
import { eventDetails } from '@components/event/utilComponents/eventUtil'

const EventTicketInfo = ({ event, updates, editEnabled, modalActions }) => {
  const handlePress = (field, additionalFields) => {
    if (editEnabled) {
      modalActions.updateEvent({ field, additionalFields })
    }
  }

  const handleDeleteEvent = () => {}

  if (!event) return null
  const eventWithUpdates = { ...event, ...updates }

  return (
    <ScrollView style={styles.container} nestedScrollEnabled={!editEnabled}>
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
          if (!editEnabled && hideUntilEdit.includes(key)) return null

          // Delete Button in edit mode
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
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                {iconName && (
                  <HeaderButton
                    type='material-community'
                    name={iconName}
                    color='tertiary'
                    backgroundColor={editEnabled ? 'secondary' : 'accent'}
                    onPress={() => handlePress(key, additionalKeys)}
                  />
                )}
                <ListItem.Title
                  style={[
                    styles.text,
                    { paddingLeft: '2%' },
                    hideUntilEdit.includes(key) ? styles.name : null
                  ]}
                >
                  {title(eventWithUpdates)}
                </ListItem.Title>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                {rightTitle && (
                  <ListItem.Title
                    style={[styles.text, { paddingRight: '2%' }]}
                    containerStyle={{ padding: '5%' }}
                  >
                    {rightTitle(eventWithUpdates)}
                  </ListItem.Title>
                )}
                {rightIconName && (
                  <HeaderButton
                    type={rightIconType || 'material-community'}
                    name={rightIconName(eventWithUpdates)}
                    color='tertiary'
                    backgroundColor={editEnabled ? 'secondary' : 'accent'}
                    onPress={() => handlePress(key, additionalKeys)}
                  />
                )}
              </View>
            </ListItem>
          )
        }
      )}

      {!editEnabled && (
        <View style={styles.buttonContainer}>
          <Button title='Tickets' buttonStyle={styles.button} />
          <Text style={styles.similarEventText}>Similar Events</Text>
          <ListItem containerStyle={styles.listItem}>
            <ListItem.Title style={styles.text}>
              {'No similar events found...'}
            </ListItem.Title>
            <Icon
              type='material-community'
              name='emoticon-cry-outline'
              color={theme.color.tertiary}
            />
          </ListItem>
        </View>
      )}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%'
  },
  buttonContainer: {
    marginVertical: '5%'
  },
  listItem: {
    backgroundColor: theme.color.background,
    justifyContent: 'space-between',
    width: '100%'
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
  button: {
    borderRadius: 25,
    backgroundColor: theme.color.secondary,
    width: '90%',
    alignSelf: 'center'
  }
})

EventTicketInfo.propTypes = {
  event: PropTypes.object,
  updates: PropTypes.object,
  editEnabled: PropTypes.bool,
  modalActions: PropTypes.object
}

export default EventTicketInfo
