import React from 'react'
import PropTypes from 'prop-types'

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { View, StyleSheet } from 'react-native'

import { KEYBOARD_AVOID_HEIGHT } from '@src/constants'

import { theme } from '@src/theme'
import ImageList from '@components/create/createImageList'
import EventDetails from '@components/create/createForm'

const CreateDetails = ({ route }) => {
  const media = route.params.media

  return (
    <KeyboardAwareScrollView
      enableOnAndroid
      extraScrollHeight={KEYBOARD_AVOID_HEIGHT}
    >
      <View style={styles.container}>
        <ImageList initialData={[media]} />
        <EventDetails />
      </View>
    </KeyboardAwareScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: theme.color.background
  },
  mediaContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '50%',
    width: '100%',
    padding: 10,
    backgroundColor: theme.color.secondary
  },
  actionContainer: {
    position: 'absolute',
    width: '50%',
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  image: {
    height: '100%',
    width: '100%',
    borderRadius: 25
  },
  textStyle: {
    color: theme.color.tertiary
  }
})

CreateDetails.propTypes = {
  route: PropTypes.object.isRequired
}

export default CreateDetails
