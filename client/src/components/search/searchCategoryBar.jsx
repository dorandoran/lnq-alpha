import React, { useContext } from 'react'
import SearchContext, { actions } from '@context/searchContext'

import { theme } from '@src/theme'
import {
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Text
} from 'react-native'
import { SCREEN_WIDTH } from '@util/constants'
import { categoryList } from '@components/search/utilComponents/searchUtil'

const SearchCategoryBar = () => {
  const { searchState, dispatch } = useContext(SearchContext)
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
    paddingRight: 15,
    borderRadius: 25
  },
  text: {
    color: theme.color.tertiary
  }
})

export default SearchCategoryBar
