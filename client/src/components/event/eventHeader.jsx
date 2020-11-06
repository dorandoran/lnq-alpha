import React from 'react'
import PropTypes from 'prop-types'

import useOverlay from '@context/overlayContext'

import { StyleSheet } from 'react-native'
import { HeaderButton } from '@common'
import { theme, SCREEN_HEIGHT } from '@util'

const EventHeader = ({ handleOpenMenu }) => {
  const { dispatch, actions } = useOverlay()

  const closeModal = () => {
    dispatch({ type: actions.modal.close })
  }

  return (
    <React.Fragment>
      <HeaderButton
        type='material'
        name='chevron-left'
        color='tertiary'
        backgroundColor='shadow'
        onPress={closeModal}
        size={30}
        containerStyle={[styles.iconContainer, styles.backButton]}
      />

      <HeaderButton
        type='material-community'
        name='menu'
        color='tertiary'
        backgroundColor='shadow'
        onPress={handleOpenMenu}
        containerStyle={[styles.iconContainer, styles.actionButton]}
      />
    </React.Fragment>
  )
}

const styles = StyleSheet.create({
  backButton: {
    left: 25
  },
  avatarButton: {
    right: 75
  },
  actionButton: {
    right: 25,
    width: 36,
    height: 36
  },
  iconContainer: {
    position: 'absolute',
    top: 25
  },
  ticketOptions: {
    right: 25,
    height: SCREEN_HEIGHT / 5,
    justifyContent: 'space-around',
    padding: 1,
    backgroundColor: theme.color.shadow,
    borderRadius: 25
  }
})

EventHeader.propTypes = {
  handleOpenMenu: PropTypes.func
}

export default EventHeader
