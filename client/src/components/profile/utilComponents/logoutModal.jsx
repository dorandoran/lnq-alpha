import React from 'react'
import PropTypes from 'prop-types'

import useAuth from '@context/authContext'
import { useRouteDispatch } from '@hooks/useRoute'

import { theme } from '@util'
import { StyleSheet, View, Text } from 'react-native'
import { DialogConfirmActions } from '@common'

const LogoutModal = ({ modalActions }) => {
  const { dispatch, actions } = useRouteDispatch()
  const { logout } = useAuth()

  const handleLogout = () => {
    dispatch({ type: actions.updateRoute, payload: 'Home' })
    logout()
  }

  const handleClose = () => {
    modalActions.cancelModal()
  }

  return (
    <View style={styles.container}>
      <View style={styles.messageContainer}>
        <Text style={styles.message}>Are you sure you want to logout?</Text>
      </View>
      <DialogConfirmActions
        handleClose={handleClose}
        handleConfirm={handleLogout}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    alignItems: 'center',
    width: '90%',
    backgroundColor: theme.color.accent,
    borderRadius: 25,
    paddingHorizontal: '3%'
  },
  messageContainer: {
    padding: '5%'
  },
  message: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.color.tertiary
  }
})

LogoutModal.propTypes = {
  modalActions: PropTypes.object
}

export default LogoutModal
