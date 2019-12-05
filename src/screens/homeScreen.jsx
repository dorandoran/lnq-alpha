import React, { useContext, useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import { Context as AuthContext } from '../context/AuthContext'

const HomeScreen = ({ navigation }) => {
  const { state } = useContext(AuthContext)

  // logs current user name and display name/username
  useEffect(() => {
    console.log(state.userInfo)
  }, [])

  return (
    <View>
      <Text>Home Screen</Text>
      <Text>Home Screen</Text>
      <Text>Home Screen</Text>
      <Text>Home Screen</Text>
      <Text>Home Screen</Text>
      <Text>Home Screen</Text>
    </View>
  )
}

const styles = StyleSheet.create({})

HomeScreen.propTypes = {
  navigation: PropTypes.object
}

export default HomeScreen