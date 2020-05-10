import React, { Fragment } from 'react'
import { View, StyleSheet, Image, Text } from 'react-native'
import { Icon } from 'react-native-elements'

const ProfileInfo = () => {
  return (
    <Fragment>
      <View style={styles.profileImageContainer}>
        <Image
          style={styles.profilePicture}
          // eslint-disable-next-line no-undef
          source={require('../../../assets/profile-main.png')}
        />
      </View>
      <View style={styles.profileHeader}>
        <View>
          <Text style={styles.nameTextStyle}>Michael Sounder</Text>
          <Text style={styles.accountTextStyle}>@mr_whattodo</Text>
          <Text style={styles.accountTextStyle}>www.mrwhatodo.com</Text>
          <Text style={styles.aboutTextStyle}>About</Text>
        </View>
        <View style={styles.notificationIcons}>
          <Icon
            name='comment'
            type='font-awesome'
            color='white'
            size={18}
            containerStyle={styles.messageIconStyle}
          />
          <Icon
            name='bell'
            type='font-awesome'
            color='white'
            size={18}
            containerStyle={styles.messageIconStyle}
          />
        </View>
      </View>
    </Fragment>
  )
}

const styles = StyleSheet.create({
  profilePicture: {
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
    borderWidth: 2,
    marginTop: -30,
    alignSelf: 'center',
    justifyContent: 'center',
    borderColor: 'white'
  },
  nameTextStyle: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 25,
    paddingVertical: 4,
    paddingHorizontal: 16
  },
  accountTextStyle: {
    color: 'white',
    paddingVertical: 4,
    paddingHorizontal: 16
  },
  aboutTextStyle: {
    color: 'gray',
    paddingVertical: 4,
    paddingHorizontal: 16
  },
  messageIconStyle: {
    width: 35,
    height: 35,
    borderRadius: 35 / 2,
    borderWidth: 2,
    borderColor: 'white',
    justifyContent: 'center',
    alignItems: 'center'
  },
  profileHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  notificationIcons: {
    marginHorizontal: 16,
    flexDirection: 'column',
    justifyContent: 'space-evenly'
  }
})

export default ProfileInfo
