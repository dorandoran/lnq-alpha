import React, { Fragment, useContext } from 'react'
import { Route } from '@context/routeStore'
import useDialog from '@context/dialogContext'
import PropTypes from 'prop-types'

import { theme } from '@src/theme'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { Icon } from 'react-native-elements'
import { SCREEN_HEIGHT } from '@util/constants'

import ActionEditEvent from '@components/event/utilComponents/actionEditEvent'
import ActionLeaveEvent from '@components/event/utilComponents/actionLeaveEvent'

import { actions } from '@context/dialogContext'

const EventHeader = ({ event, open, toggleOpen }) => {
  const dispatch = useContext(Route.Dispatch)
  const { openDialog, resetDialog } = useDialog()

  const closeModal = () => {
    resetDialog()
    dispatch({ type: 'closeModal' })
  }

  return (
    <Fragment>
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
          <TouchableOpacity onPress={toggleOpen} style={styles.container}>
            <Icon
              type='material-community'
              name='chevron-up'
              color={theme.color.tertiary}
              size={30}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.container, styles.addMedia]}
            onPress={() =>
              openDialog({
                dialog: actions.openAddMedia,
                temp: { event }
              })
            }
          >
            <Icon type='feather' name='plus' color={theme.color.tertiary} />
          </TouchableOpacity>
          <ActionEditEvent />
          <TouchableOpacity
            style={styles.container}
            onPress={() =>
              openDialog({
                dialog: actions.openDeleteMedia,
                temp: { event }
              })
            }
          >
            <Icon
              type='material-community'
              name='close'
              color={theme.color.tertiary}
            />
          </TouchableOpacity>
          <ActionLeaveEvent />
        </View>
      )}
    </Fragment>
  )
}

const styles = StyleSheet.create({
  addMedia: {
    backgroundColor: theme.color.secondary
  },
  container: {
    borderRadius: 25,
    aspectRatio: 1,
    justifyContent: 'center'
  },
  backButton: {
    left: 20
  },
  actionButton: {
    right: 20
  },
  button: {
    height: 35,
    justifyContent: 'center'
  },
  iconContainer: {
    position: 'absolute',
    top: 20,
    backgroundColor: theme.color.shadow,
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
