import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import CreateContext from '@context/createContext'

import { Icon } from 'react-native-elements'
import { theme } from '@src/theme'

const ActionRemoveMedia = ({ index }) => {
  const { details, updateMedia } = useContext(CreateContext)
  const { media } = details

  const handleRemove = () => {
    if (media.length > 1) {
      updateMedia(index)
    }
  }

  return (
    <Icon
      reverse
      type="matieral"
      name="remove"
      color={theme.color.background}
      size={20}
      onPress={handleRemove}
      disabled={media.length < 2}
    />
  )
}

ActionRemoveMedia.propTypes = {
  index: PropTypes.number.isRequired
}

export default ActionRemoveMedia
