import React, { useState } from 'react'
import { SearchProvider } from '@context/searchContext'

import EventList from '@components/search/searchEventList'
import CategoryBar from '@components/search/searchCategoryBar'

import { theme } from '@src/theme'
import { View, StyleSheet } from 'react-native'
import { SearchBar } from 'react-native-elements'

const SearchScreen = () => {
  const [text, setText] = useState('')

  return (
    <SearchProvider>
      <View style={styles.container}>
        <SearchBar
          placeholder='Search'
          value={text}
          onChangeText={text => setText(text)}
          containerStyle={styles.containerStyle}
          inputContainerStyle={styles.inputContainer}
        />
        <CategoryBar />
        <EventList text={text} />
      </View>
    </SearchProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.color.background
  },
  containerStyle: {
    backgroundColor: theme.color.background,
    marginBottom: '5%'
  },
  inputContainer: {
    backgroundColor: theme.color.accent,
    borderRadius: 25,
    paddingLeft: '3%',
    borderBottomWidth: 0
  }
})

export default SearchScreen
