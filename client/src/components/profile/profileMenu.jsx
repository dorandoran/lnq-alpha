import React from 'react'
import PropTypes from 'prop-types'

import { View, StyleSheet } from 'react-native'
import { HeaderButton } from '@common'

const ProfileMenu = ({ handlePress }) => {
  return (
    <View style={styles.container}>
      <HeaderButton
        type='material-community'
        name='menu'
        color='tertiary'
        backgroundColor='shadow'
        onPress={handlePress}
        containerStyle={[styles.iconContainer, styles.actionButton]}
      />
    </View>
  )
}

ProfileMenu.propTypes = {
  handlePress: PropTypes.func
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row-reverse',
    marginTop: '5%',
    marginLeft: '5%'
  }
})

export default ProfileMenu
