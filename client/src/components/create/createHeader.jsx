import React from 'react'
import PropTypes from 'prop-types'
import { useNavigation } from '@react-navigation/native'
// import useStorage from '@hooks/useStorage'
// import useCreateEvent from '@hooks/useCreateEvent'
import useCreateEvent from '@graphql/event/useCreateEvent'
import { useUser } from '@context/userContext'
import { ReactNativeFile } from 'apollo-upload-client'

import { View } from 'react-native'
import Header from '@common/header'
import { Icon } from 'react-native-elements'
import { theme } from '@src/theme'

const CreateHeader = ({ event }) => {
  const navigation = useNavigation()
  const createEvent = useCreateEvent()
  const userId = useUser()
  console.log(event)
  const handleRightPress = () => {
    const media = new ReactNativeFile({
      uri: event.media.uri,
      name: userId,
      type: 'image/jpeg'
    })
    console.log(media)
    createEvent({ ...event, media, userId })
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
