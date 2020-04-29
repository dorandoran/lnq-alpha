import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

import useOverlay from '@context/overlayContext'
import ActionEditEvent from '@components/event/utilComponents/actionEditEvent'
import ActionLeaveEvent from '@components/event/utilComponents/actionLeaveEvent'

import { View, StyleSheet } from 'react-native'
import { HeaderButton } from '@common'
import { theme } from '@util'
import { SCREEN_HEIGHT } from '@util/constants'

const EventHeader = ({ open, toggleOpen }) => {
  const { dispatch, actions } = useOverlay()

  const closeModal = () => {
    dispatch({ type: actions.modal.close })
  }

  const handleAddMedia = () => {
    dispatch({
      type: actions.dialog.events.addMedia
    })
  }

  const handleDeleteMedia = () => {
    dispatch({
      type: actions.dialog.events.deleteMedia
    })
  }

  return (
    <Fragment>
      <HeaderButton
        type='material'
        name='chevron-left'
        color='tertiary'
        backgroundColor='shadow'
        onPress={closeModal}
        size={30}
        containerStyle={[styles.iconContainer, styles.backButton]}
      />

      {!open ? (
        <HeaderButton
          type='material-community'
          name='menu'
          color='tertiary'
          backgroundColor='shadow'
          onPress={toggleOpen}
          containerStyle={[styles.iconContainer, styles.actionButton]}
        />
      ) : (
        <View style={[styles.iconContainer, styles.openMenu]}>
          <HeaderButton
            type='material-community'
            name='chevron-up'
            color='tertiary'
            size={30}
            onPress={toggleOpen}
          />
          <HeaderButton
            type='feather'
            name='plus'
            color='tertiary'
            backgroundColor='secondary'
            onPress={handleAddMedia}
          />
          <ActionEditEvent />
          <HeaderButton
            type='material-community'
            name='close'
            color='tertiary'
            onPress={handleDeleteMedia}
          />
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
    right: 20,
    width: 36,
    height: 36
  },
  iconContainer: {
    position: 'absolute',
    top: 20
  },
  openMenu: {
    right: 20,
    height: SCREEN_HEIGHT / 4,
    justifyContent: 'space-around',
    padding: 1,
    backgroundColor: theme.color.shadow,
    borderRadius: 25
  }
})

EventHeader.propTypes = {
  open: PropTypes.bool,
  toggleOpen: PropTypes.func
}

export default EventHeader
