import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import CreateContext from '@context/createContext'

import { TouchableOpacity, StyleSheet } from 'react-native'
import { Icon } from 'react-native-elements'
import { theme } from '@src/theme'

const ActionRemoveMedia = ({ index }) => {
  const { details, updateMedia } = useContext(CreateContext)
  const { media } = details
  const disabled = media.length < 2

  const disabledStyles = {
    backgroundColor: theme.color.tertiary,
    color: theme.color.background
  }

  const handleRemove = () => {
    if (media.length > 1) {
      updateMedia(index)
    }
  }

  return (
    <TouchableOpacity
      style={[styles.container, disabled && disabledStyles]}
      disabled={disabled}
      onPress={handleRemove}
    >
      <Icon
        type='material'
        name='remove'
        color={disabled ? disabledStyles.color : theme.color.tertiary}
        size={20}
      />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.color.background,
    aspectRatio: 1,
    borderRadius: 50,
    padding: 10,
    justifyContent: 'center'
  }
})

ActionRemoveMedia.propTypes = {
  index: PropTypes.number.isRequired
}

export default ActionRemoveMedia
