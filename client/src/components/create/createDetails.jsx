import React, { useContext } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import CreateContext from '@context/createContext'

import ActionSelectImage from '@components/create/utilComponents/actionSelectImage'
// import { useNavigation } from '@react-navigation/native'

import { Icon } from 'react-native-elements'
import { theme } from '@src/theme'

const CreateDetails = () => {
  const { data } = useContext(CreateContext)
  // const navigation = useNavigation()
  console.log('create context ', data)
  return (
    <View style={styles.container}>
      <View style={styles.mediaContainer}>
        <ActionSelectImage />
        <Icon
          reverse
          type="material-community"
          name="camera"
          color={theme.color.secondary}
          onPress={() => {}}
        />
      </View>
      <View>
        <Text style={styles.textStyle}>Form</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: theme.color.primary
  },
  mediaContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '95%',
    backgroundColor: 'yellow'
  },
  textStyle: {
    color: theme.color.tertiary
  }
})

export default CreateDetails
