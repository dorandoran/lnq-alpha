import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { theme } from '@src/theme'

import { useNavigation } from '@react-navigation/native'

import { Icon } from 'react-native-elements'

const CreateInvite = () => {
  const navigation = useNavigation()

  return (
    <View style={styles.container}>
      <Icon
        type="ionicon"
        name="md-close"
        color={theme.color.tertiary}
        onPress={() => navigation.goBack()}
      />
      <Text style={styles.textStyle}>Create Invite Screen</Text>
      <Text style={styles.textStyle}>Create Invite Screen</Text>
      <Text style={styles.textStyle}>Create Invite Screen</Text>
      <Text style={styles.textStyle}>Create Invite Screen</Text>
      <Text style={styles.textStyle}>Create Invite Screen</Text>
      <Text style={styles.textStyle}>Create Invite Screen</Text>
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

export default CreateInvite
