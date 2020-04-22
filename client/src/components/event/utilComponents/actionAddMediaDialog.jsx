import React, { Fragment, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import useStorage from '@hooks/useStorage'

import { theme } from '@src/theme'
import {
  TouchableOpacity,
  StyleSheet,
  View,
  ActivityIndicator
} from 'react-native'
import { Icon, Image } from 'react-native-elements'

import ActionSelectMedia from '@components/create/utilComponents/actionSelectMedia'
import { CAMERA_SELECTION, EVENT_CONST } from '@components/util/constants'

const initialState = {
  selected: null,
  confirmed: null
}

const ActionAddMediaDialog = ({ onComplete, id }) => {
  const [uri, setUri] = useState(initialState)

  const { media, loading } = useStorage({
    uri: uri.confirmed,
    bucketName: EVENT_CONST,
    linkId: id,
    skip: !uri.confirmed
  })

  useEffect(() => {
    let didCancel = false

    if (!didCancel && media) {
      setUri(initialState)
      onComplete()
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
              color={theme.color.background}
              onComplete={handleImageSelected}
            />
            <ActionSelectMedia
              color={theme.color.background}
              onComplete={handleImageSelected}
            />
          </View>
        )}
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.iconContainer} onPress={onComplete}>
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
    justifyContent: 'center',
    alignItems: 'center'
  }
})

ActionAddMediaDialog.propTypes = {
  id: PropTypes.string,
  onComplete: PropTypes.func
}

export default ActionAddMediaDialog
