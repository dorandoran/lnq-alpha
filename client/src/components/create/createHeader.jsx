import React from 'react'
import PropTypes from 'prop-types'
import { useNavigation } from '@react-navigation/native'
import useStorage from '@hooks/useStorage'
import useCreateEvent from '@hooks/useCreateEvent'

import { View } from 'react-native'
import Header from '@common/header'
import { Icon } from 'react-native-elements'
import { theme } from '@src/theme'

const CreateHeader = ({ event }) => {
  const navigation = useNavigation()
  const createEvent = useCreateEvent()

  const handleRightPress = () => {
    const media = {
      uri: event.media.uri,
      name: 'test.jpg'
    }
    createEvent({ ...event, media })
    navigation.navigate('Home')
  }

  return (
    <Header position="relative" backgroundColor={theme.color.background}>
      <Icon
        type="ionicon"
        name="md-close"
        color={theme.color.tertiary}
        onPress={() => navigation.goBack()}
      />
      <View />
      <Icon
        type="material"
        name="person-add"
        color={theme.color.tertiary}
        onPress={handleRightPress}
      />
    </Header>
  )
}

CreateHeader.propTypes = {
  event: PropTypes.object
}

export default CreateHeader
