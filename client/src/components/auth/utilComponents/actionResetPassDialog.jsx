import React, { Fragment, useState } from 'react'

import useOverlay from '@context/overlayContext'
import useAuth from '@context/authContext'

import LoadingDialog from '@components/overlay/loadingDialog'

import { theme } from '@util'
import { StyleSheet, View, Text } from 'react-native'
import { DialogConfirmActions, StyledInput } from '@common'

const ActionResetPassDialog = () => {
  const [email, setEmail] = useState('')
  const { dispatch, actions } = useOverlay()
  const { resetPassword, authState } = useAuth()

  const setEmailText = ({ nativeEvent }) => {
    setEmail(nativeEvent.text)
  }

  const handleClose = () => {
    setEmail('')
    dispatch({ type: actions.dialog.close })
  }

  const handleConfirm = () => {
    resetPassword({ email, onComplete: handleClose })
  }

  if (authState.loading) return <LoadingDialog />

  return (
    <Fragment>
      <View style={styles.messageContainer}>
        <Text style={[styles.text, styles.header]}>Password Recovery</Text>
        <Text style={[styles.text, styles.message]}>
          Enter email for password recovery
        </Text>
      </View>
      <StyledInput
        backgroundColor={theme.color.tertiary}
        value={email}
        onChange={setEmailText}
        color={theme.color.background}
        placeholder='Email'
        autoCapitalize='none'
        autoCorrect={false}
      />
      <DialogConfirmActions
        handleConfirm={handleConfirm}
        handleClose={handleClose}
      />
    </Fragment>
  )
}

const styles = StyleSheet.create({
  messageContainer: {
    padding: '5%'
  },
  text: {
    textAlign: 'center',
    color: theme.color.tertiary
  },
  header: {
    fontSize: 24
  },
  message: {
    fontSize: 16,
    paddingVertical: '2%'
  }
})

export default ActionResetPassDialog
