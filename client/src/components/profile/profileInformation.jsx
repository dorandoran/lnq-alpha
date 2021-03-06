import React, { Fragment } from 'react'

import useUser from '@context/userContext'

import { View, StyleSheet, Text } from 'react-native'
import { Image } from 'react-native-elements'
import { HeaderButton, Loading } from '@common'
import { theme, navigate } from '@util'

const ProfileInfo = () => {
  const { user } = useUser()
  const name = user.firstName ? `${user.firstName} ${user.lastName}` : user.name

  const handleNotificationsPress = () => {
    navigate('Notifications')
  }

  const handleInboxPress = () => {
    navigate('Inbox')
  }

  return (
    <Fragment>
      <View style={styles.imageContainer}>
        {user.avatar ? (
          <Image
            style={styles.image}
            source={{ uri: user.avatar.uri }}
            PlaceholderContent={
              <Loading size='small' styleProps={styles.loading} />
            }
          />
        ) : (
          <View style={[styles.image, styles.noAvatar]} />
        )}
      </View>
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={[styles.text, styles.name]}>{name}</Text>
          <Text style={styles.text}>
            {user.username ? `@${user.username}` : 'No Username'}
          </Text>
          <Text style={[styles.text]}>{user.website || 'No Website'}</Text>
          <Text style={[styles.text, styles.about]} numberOfLines={1}>
            {user.about || 'No About'}
          </Text>
        </View>
        <View style={styles.iconContainer}>
          <HeaderButton
            name='comment'
            type='font-awesome'
            color='tertiary'
            borderColor='tertiary'
            size={18}
            onPress={handleInboxPress}
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
  noAvatar: {
    backgroundColor: theme.color.background
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: theme.color.background
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
  about: {
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
