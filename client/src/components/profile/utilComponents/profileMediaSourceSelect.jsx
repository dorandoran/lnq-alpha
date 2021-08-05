import React from 'react'
import PropTypes from 'prop-types'

import ActionSelectMedia from '@components/create/utilComponents/actionSelectMedia'
import { View, StyleSheet } from 'react-native'
import { theme, CAMERA_SELECTION } from '@util'

const ProfileMediaSourceSelect = ({ handleSelect }) => {
  return (
    <View style={styles.container}>
      <View>
        <ActionSelectMedia
          type={CAMERA_SELECTION}
          color={theme.color.tertiary}
          backgroundColor={theme.color.shadow}
          onComplete={handleSelect}
          styleProps={styles.iconContainer}
        />
      </View>
      <View>
        <ActionSelectMedia
          color={theme.color.tertiary}
          backgroundColor={theme.color.shadow}
          onComplete={handleSelect}
          styleProps={styles.iconContainer}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: '15%',
    width: '70%',
    backgroundColor: theme.color.accent,
    borderRadius: 25,
    padding: '3%',
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center'
  },
  iconContainer: {
    marginTop: '1%',
    marginBottom: '5%',
    marginHorizontal: '8%'
  },
  message: {
    paddingBottom: '3%',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.color.tertiary
  }
})

ProfileMediaSourceSelect.propTypes = {
  handleSelect: PropTypes.func.isRequired
}

export default ProfileMediaSourceSelect
