import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { useRoute } from '@react-navigation/native'

import { View } from 'react-native'
import Header from '@common/header'
import { Icon } from 'react-native-elements'
import { theme } from '@src/theme'

const CreateHeader = ({ onRightPress }) => {
  const navigation = useNavigation()
  const route = useRoute()
  console.log(route)

  const handleRightPress = () => {
    if (onRightPress) onRightPress()
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

export default CreateHeader
