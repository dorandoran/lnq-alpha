import React from 'react'

import useSearch, { actions } from '@context/searchContext'

import {
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Text
} from 'react-native'
import { theme, SCREEN_WIDTH } from '@util'
import { categoryList } from '@components/search/utilComponents/searchUtil'

const SearchCategoryBar = () => {
  const { searchState, dispatch } = useSearch()
  const { categories } = searchState

  const isSelectedStyles = value => {
    if (categories.includes(value)) {
      return { backgroundColor: theme.color.secondary }
    }
  }

  const updateCategory = newCategory => {
    dispatch({ type: actions.updateCategories, payload: newCategory })
  }

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
            <TouchableOpacity
              style={[styles.buttonContainer, isSelectedStyles(item.value)]}
              onPress={() => updateCategory(item.value)}
            >
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
    paddingHorizontal: 10
  },
  listContainer: {
    backgroundColor: theme.color.accent,
    borderRadius: 25
  },
  buttonContainer: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 25
  },
  text: {
    color: theme.color.tertiary
  }
})

export default SearchCategoryBar
