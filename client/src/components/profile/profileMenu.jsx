import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Icon } from 'react-native-elements';

const ProfileMenu = () => {
  return (
    <View>
      <Icon 
        name='bars'
        type='font-awesome'
        color='white'
        size={30}
      />
    </View>
  )
}

const styles = StyleSheet.create({
})

export default ProfileMenu