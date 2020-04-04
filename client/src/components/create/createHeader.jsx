import React from 'react'
import PropTypes from 'prop-types'
import { useNavigation } from '@react-navigation/native'

import { View } from 'react-native'
import Header from '@common/header'
import { Icon } from 'react-native-elements'
import { theme } from '@src/theme'

import ActionSaveEvent from '@components/create/utilComponents/actionSaveEvent'

const CreateHeader = ({ event, resetForm }) => {
  const navigation = useNavigation()

  const onComplete = () => {
    resetForm()
    navigation.jumpTo('Home')
  }

  return (
    <Header position="relative" backgroundColor={theme.color.background}>
      <Icon
        type="ionicon"
        name="md-close"
        color={theme.color.tertiary}
        onPress={onComplete}
      />
      <View />
      <ActionSaveEvent event={event} onComplete={onComplete} />
    </Header>
  )
}

CreateHeader.propTypes = {
  event: PropTypes.object.isRequired,
  resetForm: PropTypes.func.isRequired
}

export default CreateHeader
