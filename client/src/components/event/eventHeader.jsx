import React, { useContext, Fragment } from 'react'
import { Route } from '@context/routeStore'
import PropTypes from 'prop-types'

import { theme } from '@src/theme'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { Icon } from 'react-native-elements'
import { SCREEN_HEIGHT } from '@util/constants'

import AddMediaFab from '@components/event/eventFab'
import ActionEditEvent from '@components/event/utilComponents/actionEditEvent'
import ActionDeleteEvent from '@components/event/utilComponents/actionDeleteEvent'
import ActionLeaveEvent from '@components/event/utilComponents/actionLeaveEvent'

const EventHeader = ({ event, open, toggleOpen }) => {
  const dispatch = useContext(Route.Dispatch)

  const closeModal = () => {
    dispatch({ type: 'closeModal' })
  }

  return (
    <Fragment>
      <View />
      <TouchableOpacity
        onPress={closeModal}
        style={[styles.iconContainer, styles.button, styles.backButton]}
      >
        <Icon
          type='material'
          name='chevron-left'
          color={theme.color.tertiary}
          size={30}
        />
      </TouchableOpacity>

      {!open ? (
        <TouchableOpacity
          onPress={toggleOpen}
          style={[styles.iconContainer, styles.button, styles.actionButton]}
        >
          <Icon
            type='material-community'
            name='menu'
            color={theme.color.tertiary}
          />
        </TouchableOpacity>
      ) : (
        <View
          style={[styles.iconContainer, styles.openMenu, styles.actionButton]}
        >
          <TouchableOpacity onPress={toggleOpen}>
            <Icon
              type='material-community'
              name='chevron-up'
              color={theme.color.tertiary}
              size={30}
            />
          </TouchableOpacity>
          <AddMediaFab />
          <ActionEditEvent />
          <ActionDeleteEvent id={event.id} onComplete={closeModal} />
          <ActionLeaveEvent />
        </View>
      )}
    </Fragment>
  )
}

const styles = StyleSheet.create({
  backButton: {
    left: 20
  },
  actionButton: {
    right: 20
  },
  button: {
    height: 35,
    paddingTop: 2,
    justifyContent: 'center'
  },
  iconContainer: {
    position: 'absolute',
    top: 20,
    backgroundColor: theme.color.accent,
    width: 35,
    borderRadius: 25
  },
  openMenu: {
    height: SCREEN_HEIGHT / 4,
    justifyContent: 'space-around',
    padding: 2
  }
})

EventHeader.propTypes = {
  event: PropTypes.object,
  open: PropTypes.bool,
  toggleOpen: PropTypes.func
}

export default EventHeader
