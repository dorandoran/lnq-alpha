import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import { useQuery } from '@apollo/client'
import { GetEvent } from '@graphql/event/queries.js'

import { theme } from '@util'
import { adjustedScreenHeight } from '@components/event/utilComponents/eventUtil'
import {
  ScrollView,
  View,
  StyleSheet,
  ImageBackground,
  TouchableOpacity
} from 'react-native'
import { Icon } from 'react-native-elements'
import { Loading, Header } from '@common'

const UserContainer = ({ id, isDialogOpen }) => {
  // const { data, loading } = useQuery(GetEvent, {
  //   variables: { id },
  //   fetchPolicy: 'cache-and-network',
  //   skip: !id
  // })

  // if (loading) {
  //   return <Loading />
  // }

  // if (!data) return null

  return (
    <ScrollView
      style={styles.container}
      snapToInterval={adjustedScreenHeight}
      decelerationRate='fast'
    >
      <ImageBackground
        // source={{ uri: data?.event.media[0].uri }}
        style={styles.image}
      >
        <Header>
          <TouchableOpacity onPress={() => { }} style={styles.iconContainer}>
            <Icon
              type='ionicon'
              name='ios-arrow-back'
              color={theme.color.tertiary}
            />
          </TouchableOpacity>
          <View />
          <View />
        </Header>
      </ImageBackground>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.color.background
  },
  iconContainer: {
    backgroundColor: theme.color.accent,
    aspectRatio: 1,
    padding: 1,
    borderRadius: 25
  },
  image: {
    flex: 1,
    resizeMode: 'cover'
  }
})

UserContainer.propTypes = {
  id: PropTypes.string,
  isDialogOpen: PropTypes.bool
}

export default UserContainer
