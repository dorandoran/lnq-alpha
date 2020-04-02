import React, { useContext } from 'react'
import CreateContext from '@context/createContext'

import { Icon } from 'react-native-elements'
import { theme } from '@src/theme'

const ActionRemoveMedia = () => {
  const { data, removeMedia } = useContext(CreateContext)

  if (!data.media.length) return null

  return (
    <Icon
      reverse
      type="matieral"
      name="remove"
      color={theme.color.primary}
      size={20}
      onPress={() => removeMedia(0)}
    />
  )
}

export default ActionRemoveMedia
