import React from 'react'

import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import { Image } from 'react-native-elements'
import { theme } from '@src/theme'

const SearchImageList = () => {
  return (
    <View style={styles.container}>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={details.media}
        keyExtractor={media => media.uri}
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity onPress={() => {}}>
              <Image
                source={{ uri: item.uri }}
                style={styles.image}
                borderRadius={25}
              />
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
  image: {
    width: 200,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default SearchImageList
