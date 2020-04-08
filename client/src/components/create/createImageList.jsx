import React, { useContext, useState, useEffect } from 'react'
import CreateContext from '@context/createContext'

import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ImageBackground
} from 'react-native'
import ActionSelectMedia from '@components/create/utilComponents/actionSelectMedia'
import ActionRemoveMedia from '@components/create/utilComponents/actionRemoveMedia'
import { CAMERA_SELECTION } from '@common/constants'
import { theme } from '@src/theme'

const CreateImageList = () => {
  const [edit, setEdit] = useState(false)
  const { details, updateMedia } = useContext(CreateContext)

  useEffect(() => {
    return () => {
      setEdit(false)
    }
  }, [])

  const handleMediaPress = () => {
    setEdit(!edit)
  }

  const handleUpdate = (index, media) => {
    setEdit(false)
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
                {edit && (
                  <View style={styles.actionContainer}>
                    <ActionSelectMedia
                      type={CAMERA_SELECTION}
                      color={theme.color.background}
                      onComplete={media => handleUpdate(index, media)}
                    />
                    <ActionSelectMedia
                      color={theme.color.background}
                      onComplete={media => handleUpdate(index, media)}
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
    flexDirection: 'row'
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
