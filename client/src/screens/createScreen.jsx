import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { theme } from '@src/theme'
import PropTypes from 'prop-types'

import { Icon } from 'react-native-elements'

const CreateScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Icon
        type="ionicon"
        name="md-close"
        color={theme.color.tertiary}
        onPress={() => navigation.goBack()}
      />
      <Text style={styles.textStyle}>Create Screen</Text>
      <Text style={styles.textStyle}>Create Screen</Text>
      <Text style={styles.textStyle}>Create Screen</Text>
      <Text style={styles.textStyle}>Create Screen</Text>
      <Text style={styles.textStyle}>Create Screen</Text>
      <Text style={styles.textStyle}>Create Screen</Text>
    </View>
  )
}

CreateScreen.propTypes = {
  navigation: PropTypes.object
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

export default CreateScreen
