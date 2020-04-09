import React from 'react'
import PropTypes from 'prop-types'

import { View, StyleSheet, FlatList } from 'react-native'
import { Image } from 'react-native-elements'

const CreateImageList = ({ initialData }) => {
  return (
    <View style={styles.container}>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={initialData}
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
    // width: '100%',
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

CreateImageList.propTypes = {
  initialData: PropTypes.array
}

export default CreateImageList
