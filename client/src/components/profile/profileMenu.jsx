import React from 'react'

import useAuth from '@context/authContext'
import { useRouteDispatch } from '@hooks/useRoute'

import { View, StyleSheet } from 'react-native'
import { HeaderButton } from '@common'

const ProfileMenu = () => {
  const { dispatch, actions } = useRouteDispatch()
  const { logout } = useAuth()

  const handleLogout = () => {
    dispatch({ type: actions.updateRoute, payload: 'Home' })
    logout()
  }

  return (
    <View style={styles.container}>
      <HeaderButton
        type='material-community'
        name='menu'
        color='tertiary'
        backgroundColor='shadow'
        onPress={handleLogout}
        containerStyle={[styles.iconContainer, styles.actionButton]}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row-reverse',
    marginTop: '5%',
    marginLeft: '5%'
  }
})

export default ProfileMenu
