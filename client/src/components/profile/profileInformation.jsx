import React, { Fragment } from 'react'

import useUser from '@context/userContext'
import useProfile, { actions } from '@context/profileContext'

import { View, StyleSheet, Text } from 'react-native'
import { Image } from 'react-native-elements'
import { HeaderButton, Loading } from '@common'
import { theme } from '@util'

const ProfileInfo = () => {
  const user = useUser()
  const name = user.firstName ? `${user.firstName} ${user.lastName}` : user.name

  const { dispatch } = useProfile()

  const handleNotificationsPress = () => {
    dispatch({ type: actions.navigateNotifications })
  }

  return (
    <Fragment>
      <View style={styles.imageContainer}>
        {user.avatarUrl ? (
          <Image
            style={styles.image}
            source={{ uri: user.avatarUrl }}
            PlaceholderContent={
              <Loading size='small' styleProps={styles.loading} />
            }
          />
        ) : (
          <View style={styles.image} />
        )}
      </View>
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={[styles.text, styles.name]}>{name}</Text>
          <Text style={styles.text}>
            {user.username ? `@${user.username}` : 'No Username'}
          </Text>
          <Text style={[styles.text]}>{user.website || 'No Website'}</Text>
          <Text style={[styles.text, styles.description]} numberOfLines={1}>
            {user.description || 'No Description'}
          </Text>
        </View>
        <View style={styles.iconContainer}>
          <HeaderButton
            name='comment'
            type='font-awesome'
            color='tertiary'
            borderColor='tertiary'
            size={18}
          />
          <HeaderButton
            name='bell'
            type='font-awesome'
            color='tertiary'
            borderColor='tertiary'
            size={18}
            onPress={handleNotificationsPress}
            containerStyle={styles.buttonMargin}
          />
        </View>
      </View>
    </Fragment>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row'
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -30
  },
  iconContainer: {
    width: '20%',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: theme.color.tertiary
  },
  textContainer: {
    width: '80%'
  },
  text: {
    color: theme.color.placeholder,
    paddingLeft: '5%',
    paddingBottom: '1%',
    fontWeight: 'bold'
  },
  name: {
    color: theme.color.tertiary,
    fontSize: 20
  },
  description: {
    paddingBottom: '3%'
  },
  buttonMargin: {
    marginBottom: '15%'
  },
  loading: {
    borderRadius: 50
  }
})

export default ProfileInfo
