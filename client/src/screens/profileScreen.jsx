import React from 'react'
import { View, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'
import { useAuth } from '@context/authContext'
import { SCREEN_HEIGHT } from '@components/util/constants'
import { SCREEN_WIDTH } from '@components/util/constants'

import ProfileListView from '@components/profile/profileListView'
import ProfileMenu from '@components/profile/profileMenu'
import ProfileTab from '@components/profile/profileTab'
import ProfileAccontStats from '@components/profile/profileAccountStats'
import ProfileInfo from '@components/profile/profileInfo'

const ProfileScreen = ({ navigation }) => {
  const { logout } = useAuth()

  const logoutButtonHandler = () => {
    logout()
  }
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../assets/profile-main.png')}
        style={styles.imageStyle}
      >
        <View style={styles.profileMenuContainer} >
          <TouchableOpacity onPress={logoutButtonHandler} >
            <ProfileMenu />
          </TouchableOpacity>
        </View>
      </ImageBackground>
      <View style={styles.profileContainer}>
        <ProfileInfo />
        <ProfileAccontStats />
        <ProfileTab />
        <ProfileListView />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  profileMenuContainer: {
    flexDirection: 'row-reverse',
    marginTop: SCREEN_HEIGHT/12,
    marginLeft: 20
  },
  imageStyle: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT/3
  },
  profileContainer: {
    flex: 1,
    backgroundColor: 'black',
    borderTopRightRadius: 21,
    borderTopLeftRadius: 21,
    marginTop: -20
  }
})

ProfileScreen.propTypes = {
  navigation: PropTypes.object
}

export default ProfileScreen
