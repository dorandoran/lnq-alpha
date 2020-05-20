import React, { useState } from 'react'
import PropTypes from 'prop-types'

import useStorage from '@hooks/useStorage'
import useNotification from '@hooks/useNotification'
import useUpdateUser from '@graphql/user/useUpdateUser'

import ActionSelectMedia from '@components/create/utilComponents/actionSelectMedia'

import { StyleSheet, View, TouchableOpacity } from 'react-native'
import { Icon, Image } from 'react-native-elements'
import { theme, CAMERA_SELECTION, BUCKET } from '@util'

const NewAvatar = ({ userId, nextPressed, goNext, resetPressed }) => {
  const [pressed, setPressed] = useState(false)
  const [uri, setUri] = useState(null)
  const { throwError } = useNotification()
  const [updateUser] = useUpdateUser({
    onCompleted: () => {
      goNext()
    }
  })

  const skip = !nextPressed || !uri
  const showColor = pressed ? theme.color.tertiary : theme.color.background
  const showBackgroundColor = pressed
    ? theme.color.accent
    : theme.color.background

  const { media, loading } = useStorage({
    uri,
    bucketName: BUCKET.USER,
    linkId: userId,
    skip
  })

  React.useEffect(() => {
    let didCancel = false

    if (!didCancel && media) {
      const updates = { avatarUrl: media.uri }
      !didCancel && updateUser({ id: userId, updates })
    }
    return () => {
      didCancel = true
    }
  }, [media])

  React.useEffect(() => {
    if (!media && skip) {
      throwError('No image selected')
      resetPressed()
    }
  }, [nextPressed])

  const handleImageSelected = ({ uri }) => {
    setUri(uri)
    setPressed(false)
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setPressed(!pressed)} disabled={loading}>
        {uri ? (
          <Image source={{ uri }} style={styles.image} borderRadius={100} />
        ) : (
          <Icon
            type='ionicon'
            name='ios-contact'
            color={theme.color.tertiary}
            size={200}
          />
        )}
      </TouchableOpacity>

      <View style={styles.actionContainer}>
        <ActionSelectMedia
          type={CAMERA_SELECTION}
          color={showColor}
          backgroundColor={showBackgroundColor}
          disabled={!pressed || loading}
          onComplete={handleImageSelected}
        />
        <ActionSelectMedia
          color={showColor}
          backgroundColor={showBackgroundColor}
          disabled={!pressed || loading}
          onComplete={handleImageSelected}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: '75%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  actionContainer: {
    flexDirection: 'row',
    width: '25%',
    justifyContent: 'space-between'
  },
  image: {
    height: 200,
    width: 200,
    marginBottom: '10%'
  }
})

NewAvatar.propTypes = {
  userId: PropTypes.string,
  nextPressed: PropTypes.bool,
  goNext: PropTypes.func,
  resetPressed: PropTypes.func
}

export default NewAvatar
