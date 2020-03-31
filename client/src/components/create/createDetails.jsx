import React, { useContext } from 'react'
import PropTypes from 'prop-types'

import { View, Text, StyleSheet } from 'react-native'
import { Image } from 'react-native-elements'
// import CreateContext from '@context/createContext'

import { theme } from '@src/theme'

const CreateDetails = ({ route }) => {
  // const { details, addMedia } = useContext(CreateContext)
  const media = route.params.media
  console.log(media)
  // addMedia(media)

  return (
    <View style={styles.container}>
      <View style={styles.mediaContainer}>
        <Image
          source={{ uri: media.uri }}
          style={[styles.image, { aspectRatio: media.aspectRatio }]}
        />
        {/* <View style={styles.actionContainer}></View> */}
      </View>
      <View>
        <Text style={styles.textStyle}>Form</Text>
      </View>
    </View>
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
    borderRadius: 25,
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
    flex: 1,
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
