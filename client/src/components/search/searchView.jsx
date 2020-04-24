import React from 'react'

import { KeyboardAwareFlatList } from 'react-native-keyboard-aware-scroll-view'
import { View, SearchBar, StyleSheet } from 'react-native-elements'

const SearchView = () => {
  return <KeyboardAwareFlatList enableOnAndroid />
}

const styles = StyleSheet.create({
  container: {}
})

export default SearchView
