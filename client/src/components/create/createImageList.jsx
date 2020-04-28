import React from 'react'
import useCreate from '@context/createContext'

import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ImageBackground
} from 'react-native'
import ActionSelectMedia from '@components/create/utilComponents/actionSelectMedia'
import ActionRemoveMedia from '@components/create/utilComponents/actionRemoveMedia'
import { CAMERA_SELECTION } from '@components/util/constants'
import { theme } from '@util'

const CreateImageList = () => {
  const {
    details,
    updateMedia,
    imageEdit,
    toggleImageEdit,
    closeImageEdit
  } = useCreate()

  const handleMediaPress = () => {
    toggleImageEdit()
  }

  const handleUpdate = (index, media) => {
    closeImageEdit()
    updateMedia(index, media)
  }

  return (
    <View style={styles.container}>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={details.media}
        keyExtractor={media => media.uri}
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity onPress={handleMediaPress}>
              <ImageBackground
                source={{ uri: item.uri }}
                style={styles.image}
                borderRadius={25}
              >
                {imageEdit && (
                  <View style={styles.actionContainer}>
                    <ActionSelectMedia
                      type={CAMERA_SELECTION}
                      color={theme.color.tertiary}
                      backgroundColor={theme.color.shadow}
                      onComplete={media => handleUpdate(index, media)}
                      closeIconContainer={closeImageEdit}
                    />
                    <ActionSelectMedia
                      color={theme.color.tertiary}
                      backgroundColor={theme.color.shadow}
                      onComplete={media => handleUpdate(index, media)}
                      closeIconContainer={closeImageEdit}
                    />
                    <ActionRemoveMedia index={index} />
                  </View>
                )}
              </ImageBackground>
            </TouchableOpacity>
          )
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    marginBottom: 20
  },
  actionContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around'
  },
  text: {
    color: 'white'
  },
  image: {
    width: 200,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default CreateImageList
