import React from 'react'

import { View, StyleSheet } from 'react-native'
import { SearchBar } from 'react-native-elements'
import { theme } from '@util'

const ProfileInbox = () => {
  const [text, setText] = React.useState('')

  return (
    <View style={styles.container}>
      <SearchBar
        placeholder='Search'
        value={text}
        onChangeText={text => setText(text)}
        containerStyle={styles.containerStyle}
        inputContainerStyle={styles.inputContainer}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
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

export default ProfileInbox
