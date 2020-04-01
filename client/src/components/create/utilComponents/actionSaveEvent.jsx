import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import CreateContext from '@context/createContext'

import { Icon } from 'react-native-elements'
import { theme } from '@src/theme'

const ActionSaveEvent = event => {
  const { addMedia, updateDetails } = useContext(CreateContext)

  const handlePress = () => {}

  return <Icon type="material" name="person-add" color={theme.color.tertiary} />
}

export default ActionSaveEvent
