import React, { useContext } from 'react'
import * as Permissions from 'expo-permissions'
import * as ImagePicker from 'expo-image-picker'
import CreateContext from '@context/createContext'

import { Icon } from 'react-native-elements'
import { theme } from '@src/theme'

const ActionSelectImage = () => {
  const { addMedia } = useContext(CreateContext)

  const getPermissionAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL)
    if (status !== 'granted') {
      throw new Error('Camera roll permissions are required to add pictures!')
    }
  }

  const pickImage = async () => {
    await getPermissionAsync()
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1
    })
    console.log('image', result)

    if (!result.cancelled) addMedia(result.uri)
  }

  return (
    <Icon
      reverse
      type="material-community"
      name="library-plus"
      color={theme.color.secondary}
      onPress={() => pickImage()}
    />
  )
}

export default ActionSelectImage
