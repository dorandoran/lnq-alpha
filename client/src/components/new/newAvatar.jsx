import React, { useState, Fragment } from 'react'
import PropTypes from 'prop-types'

import useStorage from '@hooks/useStorage'
import useNotification from '@hooks/useNotification'
import useUpdateUser from '@graphql/user/useUpdateUser'

import ActionSelectMedia from '@components/create/utilComponents/actionSelectMedia'
import BottomBar from '@components/new/utilComponents/newBottomButtonBar'

import { StyleSheet, View, TouchableOpacity } from 'react-native'
import { Icon, Image } from 'react-native-elements'
import { theme, CAMERA_SELECTION, BUCKET } from '@util'

const NewAvatar = ({ userId, goNext }) => {
  const [avatarPressed, setAvatarPressed] = useState(false)
  const [nextPressed, setNextPress] = useState(false)
  const [uri, setUri] = useState(null)
  const { throwLoading, closeNotification } = useNotification()
  const [updateUser] = useUpdateUser({
    onCompleted: () => {
      closeNotification()
      goNext()
    }
  })

  const showColor = avatarPressed
    ? theme.color.tertiary
    : theme.color.background
  const showBackgroundColor = avatarPressed
    ? theme.color.accent
    : theme.color.background

  const { media, loading } = useStorage({
    uri,
    bucketName: BUCKET.USER,
    linkId: userId,
    skip: !nextPressed || !uri,
    onStart: () => throwLoading()
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

  const handleImageSelected = ({ uri }) => {
    setUri(uri)
    setAvatarPressed(false)
  }

  const handleNext = () => {
    if (uri) {
      setNextPress(true)
    }
  }

  return (
    <Fragment>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => setAvatarPressed(!avatarPressed)}
          disabled={loading}
        >
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
            disabled={!avatarPressed || loading}
            onComplete={handleImageSelected}
          />
          <ActionSelectMedia
            color={showColor}
            backgroundColor={showBackgroundColor}
            disabled={!avatarPressed || loading}
            onComplete={handleImageSelected}
          />
        </View>
      </View>
      <BottomBar
        disabled={!uri}
        onActionPress={handleNext}
        onSkipPress={goNext}
      />
    </Fragment>
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
  goNext: PropTypes.func
}

export default NewAvatar
