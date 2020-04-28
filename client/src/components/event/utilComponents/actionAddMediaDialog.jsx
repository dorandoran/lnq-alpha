import React, { Fragment, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import useOverlay from '@context/overlayContext'
import useStorage from '@hooks/useStorage'
import useNotification from '@hooks/useNotification'

import { theme } from '@util'
import {
  TouchableOpacity,
  StyleSheet,
  View,
  ActivityIndicator
} from 'react-native'
import { Icon, Image } from 'react-native-elements'

import ActionSelectMedia from '@components/create/utilComponents/actionSelectMedia'
import { CAMERA_SELECTION, BUCKET } from '@components/util/constants'

const initialState = {
  selected: null,
  confirmed: null
}

const ActionAddMediaDialog = () => {
  const [uri, setUri] = useState(initialState)
  const { throwSuccess } = useNotification()
  const {
    modal: { data },
    dispatch,
    actions
  } = useOverlay()

  const { media, loading } = useStorage({
    uri: uri.confirmed,
    bucketName: BUCKET.EVENT,
    linkId: data.id,
    skip: !uri.confirmed,
    onSuccess: () => throwSuccess('Media successfully added.')
  })

  const handleClose = payload => {
    const action = { type: actions.dialog.close }
    if (payload) action.payload = payload
    dispatch(action)
  }

  useEffect(() => {
    let didCancel = false

    if (!didCancel && media) {
      setUri(initialState)
      handleClose({ media })
    }
    return () => {
      didCancel = true
    }
  }, [media])

  const handleConfirm = () => {
    setUri({ ...uri, confirmed: uri.selected })
  }

  const handleImageSelected = ({ uri }) => {
    setUri({ selected: uri })
  }

  if (loading) {
    return (
      <View style={styles.image}>
        <ActivityIndicator size='large' color={theme.color.secondary} />
      </View>
    )
  }

  return (
    <Fragment>
      <View style={styles.padding}>
        {uri.selected ? (
          <Image
            source={{ uri: uri.selected }}
            style={styles.image}
            borderRadius={25}
          />
        ) : (
          <View style={[styles.image, styles.actionContainer]}>
            <ActionSelectMedia
              type={CAMERA_SELECTION}
              color={theme.color.tertiary}
              backgroundColor={theme.color.shadow}
              onComplete={handleImageSelected}
            />
            <ActionSelectMedia
              color={theme.color.tertiary}
              backgroundColor={theme.color.shadow}
              onComplete={handleImageSelected}
            />
          </View>
        )}
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.iconContainer} onPress={handleClose}>
          <Icon
            type='ionicon'
            name='md-close'
            color={theme.color.error}
            reverse
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconContainer} onPress={handleConfirm}>
          <Icon
            type='ionicon'
            name='md-checkmark'
            color={theme.color.success}
            reverse
          />
        </TouchableOpacity>
      </View>
    </Fragment>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.color.secondary,
    borderRadius: 25,
    aspectRatio: 1,
    justifyContent: 'center'
  },
  actionContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: theme.color.background,
    borderRadius: 25
  },
  padding: {
    padding: '5%'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  iconContainer: {
    paddingLeft: '10%',
    paddingRight: '10%'
  },
  image: {
    width: 200,
    height: 200,
    justifyContent: 'space-evenly',
    alignItems: 'center'
  }
})

ActionAddMediaDialog.propTypes = {
  onComplete: PropTypes.func
}

export default ActionAddMediaDialog
