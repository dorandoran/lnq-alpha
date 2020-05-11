import React from 'react'
import PropTypes from 'prop-types'

import useAuth from '@context/authContext'

import { theme } from '@util'
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native'
import { Button } from 'react-native-elements'

const AuthButtonGroup = () => {
  const { login } = useAuth()

  return (
    <View style={styles.container}>
      <Button
        containerStyle={styles.buttonContainer}
        buttonStyle={styles.button}
        title='Login'
        onPress={() => {}}
      />
      <TouchableOpacity style={styles.buttonContainer} onPress={() => {}}>
        <Text style={[styles.text, styles.reset]}>Reset your Password</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonContainer} onPress={() => {}}>
        <Text style={[styles.text, styles.new]}>New user? Sign up here</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center'
  },
  buttonContainer: {
    width: '95%',
    margin: '3%'
  },
  button: {
    borderRadius: 25,
    backgroundColor: theme.color.secondary
  },
  text: {
    alignSelf: 'center',
    fontSize: 20,
    fontWeight: 'bold'
  },
  reset: { color: theme.color.secondary },
  new: { color: theme.color.tertiary }
})

AuthButtonGroup.propTypes = {}

export default AuthButtonGroup
