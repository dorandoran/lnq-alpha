import React from 'react'
import { SearchProvider } from '@context/searchContext'

import SearchView from '@components/search/searchView'

import { theme } from '@src/theme'
import { View, StyleSheet } from 'react-native'

const SearchScreen = () => {
  return (
    <SearchProvider>
      <View style={styles.container}>
        <SearchView />
      </View>
    </SearchProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.color.background
  }
})

export default SearchScreen
