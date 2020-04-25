import React from 'react'

import { theme } from '@src/theme'
import {
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Text
} from 'react-native'
import { EVENT_TYPE_ARRAY, SCREEN_WIDTH } from '@util/constants'

const SearchCategoryBar = () => {
  const categoryList = [
    { label: 'Near Me', value: 'near' },
    { label: 'Suggested', value: 'suggested' },
    ...EVENT_TYPE_ARRAY
  ]

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.listContainer}
        horizontal
        showsHorizontalScrollIndicator={false}
        data={categoryList}
        keyExtractor={item => item.value}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity style={styles.buttonContainer}>
              <Text style={styles.text}>{item.label}</Text>
            </TouchableOpacity>
          )
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH,
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10
  },
  listContainer: {
    backgroundColor: theme.color.accent,
    borderRadius: 25
  },
  buttonContainer: {
    padding: 10,
    paddingLeft: 15,
    paddingRight: 15
  },
  text: {
    color: theme.color.tertiary
  }
})

export default SearchCategoryBar
