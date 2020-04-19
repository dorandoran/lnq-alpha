import React, { Fragment, useState, useEffect, useContext } from 'react'
import { Route } from '@context/routeStore'
import useStorage from '@hooks/useStorage'

import { theme } from '@src/theme'
import { TouchableOpacity, StyleSheet, View } from 'react-native'
import { Icon } from 'react-native-elements'

import ActionSelectMedia from '@components/create/utilComponents/actionSelectMedia'
import { CAMERA_SELECTION, EVENT_CONST } from '@components/util/constants'

const EventFab = () => {
  const [uri, setUri] = useState(null)
  const [fabPosition, setFabPosition] = useState(null)
  const [showButton, setShowButton] = useState(false)
  const { selected } = useContext(Route.State)

  const { media } = useStorage({
    uri,
    bucketName: EVENT_CONST,
    skip: !uri,
    linkId: selected.id
  })

  useEffect(() => {
    return () => {
      setUri(null)
      setShowButton(false)
    }
  }, [media])

  const handleOpen = () => {
    setShowButton(false)
  }

  const handleComplete = ({ uri }) => {
    setUri(uri)
  }

  return (
    <Fragment>
      {showButton && (
        <View style={[styles.fabContainer, fabPosition]}>
          <ActionSelectMedia
            type={CAMERA_SELECTION}
            onComplete={handleComplete}
            onOpen={handleOpen}
          />

          <ActionSelectMedia onComplete={handleComplete} />
        </View>
      )}
      <TouchableOpacity
        style={styles.container}
        onPress={() => setShowButton(!showButton)}
        onLayout={({ nativeEvent: { layout } }) => {
          // Sets position of hidden fabs based on the Create button
          if (!fabPosition)
            setFabPosition({
              top: layout.height * 1.25,
              right: layout.width * 1.5
            })
        }}
      >
        <Icon type='feather' name='plus' color={theme.color.tertiary} />
      </TouchableOpacity>
    </Fragment>
  )
}

const styles = StyleSheet.create({
  fabContainer: {
    position: 'absolute',
    flexDirection: 'row'
  },
  container: {
    backgroundColor: theme.color.secondary,
    borderRadius: 25,
    aspectRatio: 1,
    justifyContent: 'center'
  }
})

export default EventFab
