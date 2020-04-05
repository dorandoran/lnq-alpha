import React, { useContext } from 'react'
import CreateContext from '@context/createContext'

import { View, StyleSheet, FlatList } from 'react-native'
import { Image } from 'react-native-elements'

const CreateImageList = () => {
  const { details } = useContext(CreateContext)

  return (
    <View style={styles.container}>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={details.media}
        keyExtractor={media => media.uri}
        renderItem={({ item }) => {
          return (
            <Image
              source={{ uri: item.uri }}
              style={styles.image}
              borderRadius={25}
            />
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
  text: {
    color: 'white'
  },
  image: {
    width: 200,
    height: 200
  }
})

export default CreateImageList
