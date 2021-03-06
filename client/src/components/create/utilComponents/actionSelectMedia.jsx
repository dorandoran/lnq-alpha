import React, { useEffect, useState } from 'react'
import { ReactNativeFile } from 'apollo-upload-client'
import * as ImagePicker from 'expo-image-picker'
import PropTypes from 'prop-types'

import { TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native'
import { Icon } from 'react-native-elements'
import { theme, CAMERA_SELECTION } from '@util'

const ActionSelectMedia = ({
  navigateToDetails,
  closeIconContainer,
  onComplete,
  type,
  styleProps,
  disabled,
  color = theme.color.tertiary,
  backgroundColor = theme.color.secondary
}) => {
  const [isSelected, setIsSelected] = useState(false)

  const handleButtonPress = () => {
    setIsSelected(true)
  }

  // Camera Roll Permissions
  const getCameraRollPermissions = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
    if (status !== 'granted') {
      setIsSelected(false)
      // TODO Find a better way to handle this
      throw new Error('Camera roll permissions are required to add pictures!')
    }
  }

  // Camera Permissions
  const getCameraPermissions = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync()()
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
      quality: 0.6 // Setting to 1 freezes when sending media to firebase storage
    }

    async function launchMediaAsync() {
      let result
      await getCameraRollPermissions()
      if (!didCancel && type === CAMERA_SELECTION) {
        await getCameraPermissions()
        result = await ImagePicker.launchCameraAsync(imagePickerOptions)
      } else {
        result = await ImagePicker.launchImageLibraryAsync(imagePickerOptions)
      }

      // Order of operations is important with the state changes
      // otherwise will get no-op error
      setIsSelected(false)

      if (!result.cancelled) {
        const uri = result.uri
        const filename = uri.split('/').pop()
        const regexMatch = /\.(\w+)$/.exec(filename)
        const type = regexMatch ? `image/${regexMatch[1]}` : 'image'

        const file = new ReactNativeFile({
          uri,
          name: filename,
          type
        })

        if (onComplete) onComplete({ uri, file })
        else navigateToDetails({ uri, file })
      }

      if (closeIconContainer) closeIconContainer()
    }
    if (isSelected) {
      launchMediaAsync()
    }

    // Clean up
    return () => {
      didCancel = true
    }
  }, [isSelected])

  return (
    <TouchableOpacity
      onPress={handleButtonPress}
      disabled={isSelected || disabled}
      activeOpacity={0.8}
      style={[styles.container, styleProps, { backgroundColor }]}
    >
      {isSelected ? (
        <ActivityIndicator size='small' color={theme.color.tertiary} />
      ) : (
        <Icon
          type='material-community'
          name={type === CAMERA_SELECTION ? 'camera' : 'image-multiple'}
          color={color}
          size={20}
        />
      )}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.color.secondary,
    overlayColor: theme.color.secondary,
    aspectRatio: 1,
    borderRadius: 50,
    padding: 10,
    justifyContent: 'center'
  }
})

ActionSelectMedia.propTypes = {
  navigateToDetails: PropTypes.func,
  onComplete: PropTypes.func,
  disabled: PropTypes.bool,
  type: PropTypes.string,
  color: PropTypes.string,
  backgroundColor: PropTypes.string,
  closeIconContainer: PropTypes.func,
  styleProps: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
}

export default ActionSelectMedia
