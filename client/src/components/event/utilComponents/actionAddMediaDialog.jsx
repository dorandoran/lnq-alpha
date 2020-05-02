import React, { Fragment, useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import useOverlay from '@context/overlayContext'
import useStorage from '@hooks/useStorage'
import useNotification from '@hooks/useNotification'

import ActionSelectMedia from '@components/create/utilComponents/actionSelectMedia'

import { theme, CAMERA_SELECTION, BUCKET } from '@util'
import { StyleSheet, View, ActivityIndicator } from 'react-native'
import { Image } from 'react-native-elements'
import { DialogConfirmActions } from '@common'

const initialState = {
  selected: null,
  confirmed: null
}

const ActionAddMediaDialog = () => {
  const [uri, setUri] = useState(initialState)
  const { throwSuccess, throwError } = useNotification()
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
    if (uri) {
      setUri({ ...uri, confirmed: uri.selected })
    }
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
      <DialogConfirmActions
        handleClose={handleClose}
        handleConfirm={handleConfirm}
      />
    </Fragment>
  )
}

const styles = StyleSheet.create({
  actionContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: theme.color.background,
    borderRadius: 25
  },
  padding: {
    padding: '5%'
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
