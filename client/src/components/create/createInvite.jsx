import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { theme } from '@util'

import { SearchBar } from 'react-native-elements'

const CreateInvite = () => {
  const [search, setSearch] = useState('')
  return (
    <View style={styles.container}>
      <SearchBar
        placeholder='Search'
        value={search}
        onChangeText={setSearch}
        containerStyle={styles.containerStyle}
        inputContainerStyle={styles.inputContainer}
      />
    </View>
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

export default CreateInvite
