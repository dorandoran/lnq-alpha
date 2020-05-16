import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import useUser from '@context/userContext'
import useStorage from '@hooks/useStorage'

import ActionSelectMedia from '@components/create/utilComponents/actionSelectMedia'

import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { Icon, Image } from 'react-native-elements'
import { theme, CAMERA_SELECTION, BUCKET } from '@util'
import { Loading } from '@common'

const initialState = {
  selected: null,
  confirmed: null
}

const NewAvatar = () => {
  const [pressed, setPressed] = useState(false)
  const [uri, setUri] = useState(initialState)

  const handleImageSelected = ({ uri }) => {
    setUri({ selected: uri })
    setPressed(false)
  }

  return (
    <View style={styles.container}>
      <View style={styles.actionContainer}>
        <ActionSelectMedia
          type={CAMERA_SELECTION}
          color={pressed ? theme.color.tertiary : theme.color.background}
          backgroundColor={
            pressed ? theme.color.accent : theme.color.background
          }
          disabled={!pressed}
          onComplete={handleImageSelected}
        />
        <ActionSelectMedia
          color={pressed ? theme.color.tertiary : theme.color.background}
          backgroundColor={
            pressed ? theme.color.accent : theme.color.background
          }
          disabled={!pressed}
          onComplete={handleImageSelected}
        />
      </View>
      <TouchableOpacity onPress={() => setPressed(!pressed)}>
        {uri.selected ? (
          <Image
            source={{ uri: uri.selected }}
            style={styles.image}
            borderRadius={100}
            PlaceholderContent={<Loading />}
          />
        ) : (
          <Icon
            type='ionicon'
            name='ios-contact'
            color={theme.color.tertiary}
            size={200}
          />
        )}
      </TouchableOpacity>
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
    width: 200
  }
})

NewAvatar.propTypes = {
  id: PropTypes.string,
  isDialogOpen: PropTypes.bool
}

export default NewAvatar
