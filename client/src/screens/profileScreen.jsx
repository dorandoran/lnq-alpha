import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Button } from 'react-native-elements'
import PropTypes from 'prop-types'
import { useAuth } from '@context/authContext'

const ProfileScreen = ({ navigation }) => {
  const { logout } = useAuth()

  const logoutButtonHandler = () => {
    logout()
  }
  return (
    <View>
      <Text>Profile Screen</Text>
      <Text>Profile Screen</Text>
      <Text>Profile Screen</Text>
      <Text>Profile Screen</Text>
      <Text>Profile Screen</Text>
      <Text>Profile Screen</Text>
      <Button 
        title="LOGOUT"
        onPress={logoutButtonHandler}
      />
    </View>
  )
}

const styles = StyleSheet.create({})

ProfileScreen.propTypes = {
  navigation: PropTypes.object
}

export default ProfileScreen