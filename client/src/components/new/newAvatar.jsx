import React, { useState, Fragment } from 'react'
import PropTypes from 'prop-types'

import useNotification from '@hooks/useNotification'
import useUpdateUserAvatar from '@graphql/user/useUpdateUserAvatar'

import ActionSelectMedia from '@components/create/utilComponents/actionSelectMedia'
import BottomBar from '@components/new/utilComponents/newBottomButtonBar'

import { StyleSheet, View, TouchableOpacity } from 'react-native'
import { Icon, Image } from 'react-native-elements'
import { theme, CAMERA_SELECTION } from '@util'

const NewAvatar = ({ goNext }) => {
  const [avatarPressed, setAvatarPressed] = useState(false)
  const [avatar, setAvatar] = useState(null)
  const { throwLoading, closeNotification } = useNotification()
  const [updateUserAvatar, loading] = useUpdateUserAvatar({
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

  React.useEffect(() => {
    if (loading) throwLoading()
  }, [loading])

  const handleImageSelected = image => {
    setAvatar(image)
    setAvatarPressed(false)
  }

  const handleNext = () => {
    if (avatar) {
      updateUserAvatar({ image: avatar.file })
    }
  }

  return (
    <Fragment>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => setAvatarPressed(!avatarPressed)}
          disabled={loading}
        >
          {avatar ? (
            <Image
              source={{ uri: avatar.uri }}
              style={styles.image}
              borderRadius={100}
            />
          ) : (
            <Icon
              type='material-community'
              name='account'
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
      <BottomBar disabled={!avatar} onActionPress={handleNext} />
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
    borderRadius: 100,
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
