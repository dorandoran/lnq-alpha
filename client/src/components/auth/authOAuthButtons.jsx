import React from 'react'
import PropTypes from 'prop-types'

import useAuth from '@context/authContext'

import { theme } from '@util'
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native'
import { SocialIcon, Divider } from 'react-native-elements'

const AuthButtonGroup = () => {
  const { login } = useAuth()

  return (
    <View style={styles.container}>
      <View style={styles.sectionContainer}>
        <Divider style={styles.divider} />
        <Text style={styles.text}>Or Connect With</Text>
        <Divider style={styles.divider} />
      </View>
      <View style={styles.sectionContainer}>
        <TouchableOpacity style={styles.buttonContainer} onPress={() => {}}>
          <SocialIcon title='Sign In' button type='google' />
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonContainer} onPress={() => {}}>
          <SocialIcon title='Sign In' button type='facebook' />
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: '3%'
  },
  sectionContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center'
  },
  buttonContainer: {
    width: '45%'
  },
  divider: {
    width: '30%',
    height: 2,
    backgroundColor: theme.color.tertiary,
    marginVertical: '5%'
  },
  text: {
    fontSize: 16,
    color: theme.color.tertiary
  }
})

AuthButtonGroup.propTypes = {}

export default AuthButtonGroup
