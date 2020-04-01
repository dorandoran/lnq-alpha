import React from 'react'
import * as ImagePicker from 'expo-image-picker'
import PropTypes from 'prop-types'

import { TouchableOpacity } from 'react-native'
import { Icon } from 'react-native-elements'
import { theme } from '@src/theme'
import { CAMERA_SELECTION } from '@src/constants'

const ActionSelectMedia = ({ navigateToDetails, type }) => {
  const [loading, setLoading] = React.useState(false)
  // Camera Roll Permissions
  const getCameraRollPermissions = async () => {
    const { status } = await ImagePicker.requestCameraRollPermissionsAsync()
    if (status !== 'granted') {
      setLoading(false)
      // TODO Find a better way to handle this
      throw new Error('Camera roll permissions are required to add pictures!')
    }
  }

  // Camera Permissions
  const getCameraPermissions = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync()
    if (status !== 'granted') {
      setLoading(false)
      // TODO Find a better way to handle this
      throw new Error('Camera permissions are required to add pictures!')
    }
  }

  const launchMediaAsync = async () => {
    setLoading(true)
    let result
    await getCameraRollPermissions()
    if (type === CAMERA_SELECTION) {
      await getCameraPermissions()
      result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        aspect: [16, 9],
        quality: 1
      })
    } else {
      result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        aspect: [16, 9],
        quality: 1
      })
    }
    console.log(result)
    if (!result.cancelled) {
      navigateToDetails({
        uri: result.uri,
        aspectRatio: result.height / result.width
      })
    }
    setLoading(false)
  }

  return (
    <TouchableOpacity
      onPress={launchMediaAsync}
      disabled={loading}
      activeOpacity={0.8}
    >
      <Icon
        reverse
        type="material-community"
        name={type === CAMERA_SELECTION ? 'camera' : 'library-plus'}
        color={theme.color.secondary}
        size={20}
      />
    </TouchableOpacity>
  )
}

ActionSelectMedia.propTypes = {
  navigateToDetails: PropTypes.func.isRequired,
  type: PropTypes.string
}

export default ActionSelectMedia
