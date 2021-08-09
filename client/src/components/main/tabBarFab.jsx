import React, { useState, useEffect } from 'react'
import { ReactNativeFile } from 'apollo-upload-client'
import { useRouteDispatch, useRouteState } from '@hooks/useRoute'

import * as ImagePicker from 'expo-image-picker'
import { SpeedDial } from 'react-native-elements'
import { theme, navigate, CAMERA_SELECTION, GALLERY_SELECTION } from '@util'

const TabBarFab = () => {
  const { tabBar } = useRouteState()
  const { dispatch, actions } = useRouteDispatch()
  const [selection, setSelection] = useState(null)

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
      if (!didCancel && selection === CAMERA_SELECTION) {
        await getCameraPermissions()
        result = await ImagePicker.launchCameraAsync(imagePickerOptions)
      } else {
        result = await ImagePicker.launchImageLibraryAsync(imagePickerOptions)
      }

      // Order of operations is important with the state changes
      // otherwise will get no-op error
      setSelection(null)

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

        // Passes media to <CreateDetails />
        navigate('Create', {
          screen: 'Create',
          params: { media: { uri, file } }
        })
      }

      dispatch({ type: actions.closeFab })
    }
    if (selection) {
      launchMediaAsync()
    }

    // Clean up
    return () => {
      didCancel = true
    }
  }, [selection])

  const handleButtonPress = choice => {
    setSelection(choice)
  }

  // Camera Roll Permissions
  const getCameraRollPermissions = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
    if (status !== 'granted') {
      setSelection(null)
      // TODO Find a better way to handle this
      throw new Error('Camera roll permissions are required to add pictures!')
    }
  }

  // Camera Permissions
  const getCameraPermissions = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync()()
    if (status !== 'granted') {
      setSelection(null)
      // TODO Find a better way to handle this
      throw new Error('Camera permissions are required to add pictures!')
    }
  }

  if (!tabBar.show) return null

  return (
    <SpeedDial
      isOpen={tabBar.fab}
      icon={{ name: 'add', color: theme.color.tertiary }}
      openIcon={{ name: 'close', color: theme.color.tertiary }}
      onOpen={() => dispatch({ type: actions.toggleFab })}
      onClose={() => dispatch({ type: actions.toggleFab })}
      color={theme.color.secondary}
    >
      <SpeedDial.Action
        color={theme.color.secondary}
        icon={{
          type: 'material-community',
          name: 'camera',
          color: theme.color.tertiary
        }}
        title='Camera'
        loading={selection === CAMERA_SELECTION}
        onPress={() => handleButtonPress(CAMERA_SELECTION)}
      />
      <SpeedDial.Action
        color={theme.color.secondary}
        icon={{
          type: 'material-community',
          name: 'image-multiple',
          color: theme.color.tertiary
        }}
        title='Gallery'
        loading={selection === GALLERY_SELECTION}
        onPress={() => handleButtonPress(GALLERY_SELECTION)}
      />
    </SpeedDial>
  )
}

export default TabBarFab
