import React, { useContext } from 'react'
import { theme } from '@src/theme'
import { useNavigation } from '@react-navigation/native'
import CreateContext from '@context/createContext'

import { View, Text, StyleSheet } from 'react-native'
import { Icon } from 'react-native-elements'

const CreateMedia = () => {
  const value = useContext(CreateContext)
  const navigation = useNavigation()

  console.log(value)
  return (
    <View style={styles.container}>
      <Icon
        type="ionicon"
        name="md-close"
        color={theme.color.tertiary}
        onPress={() => navigation.goBack()}
      />
      <Text style={styles.textStyle}>Create Media Screen</Text>
      <Text style={styles.textStyle}>Create Media Screen</Text>
      <Text style={styles.textStyle}>Create Media Screen</Text>
      <Text style={styles.textStyle}>Create Media Screen</Text>
      <Text style={styles.textStyle}>Create Media Screen</Text>
      <Text style={styles.textStyle}>Create Media Screen</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.color.primary
  },
  textStyle: {
    color: theme.color.tertiary
  }
})

export default CreateMedia
