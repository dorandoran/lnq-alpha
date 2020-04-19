import React, { useEffect, useState } from 'react'
import * as ImagePicker from 'expo-image-picker'
import PropTypes from 'prop-types'

import { TouchableOpacity } from 'react-native'
import { Icon } from 'react-native-elements'
import { theme } from '@src/theme'
import { CAMERA_SELECTION } from '@components/util/constants'

const ActionSelectMedia = ({
  navigateToDetails,
  onOpen,
  onComplete,
  type,
  color
}) => {
  const [isSelected, setIsSelected] = useState(false)

  // Camera Roll Permissions
  const getCameraRollPermissions = async () => {
    const { status } = await ImagePicker.requestCameraRollPermissionsAsync()
    if (status !== 'granted') {
      setIsSelected(false)
      // TODO Find a better way to handle this
      throw new Error('Camera roll permissions are required to add pictures!')
    }
  }

  // Camera Permissions
  const getCameraPermissions = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync()
    if (status !== 'granted') {
      setIsSelected(false)
      // TODO Find a better way to handle this
      throw new Error('Camera permissions are required to add pictures!')
    }
  }

  useEffect(() => {
    let didCancel = false
    const imagePickerOptions = {
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [16, 9],
      quality: 0.8 // Setting to 1 freezes when send media to firebase storage
    }

    async function launchMediaAsync () {
      let result
      await getCameraRollPermissions()
      if (!didCancel && type === CAMERA_SELECTION) {
        await getCameraPermissions()
        result = await ImagePicker.launchCameraAsync(imagePickerOptions)
      } else {
        result = await ImagePicker.launchImageLibraryAsync(imagePickerOptions)
      }

      if (!result.cancelled) {
        const media = {
          uri: result.uri,
          aspectRatio: result.height / result.width
        }
        setIsSelected(false)
        if (onComplete) onComplete(media)
        else navigateToDetails(media)
      }
    }
    if (isSelected) {
      if (onOpen) onOpen()
      launchMediaAsync()
    }

    // Clean up
    return () => {
      didCancel = true
    }
  }, [isSelected])

  return (
    <TouchableOpacity
      onPress={() => setIsSelected(true)}
      disabled={isSelected}
      activeOpacity={0.8}
    >
      <Icon
        reverse
        type='material-community'
        name={type === CAMERA_SELECTION ? 'camera' : 'library-plus'}
        color={color || theme.color.secondary}
        size={20}
      />
    </TouchableOpacity>
  )
}

ActionSelectMedia.propTypes = {
  navigateToDetails: PropTypes.func,
  onComplete: PropTypes.func,
  onOpen: PropTypes.func,
  type: PropTypes.string,
  color: PropTypes.string
}

export default ActionSelectMedia
