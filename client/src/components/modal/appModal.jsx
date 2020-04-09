import React, { useContext } from 'react'
import { Route } from '@context/routeStore'

import { useQuery } from '@apollo/react-hooks'
import { GetEvent } from '@graphql/event/queries.graphql'

import { theme } from '@src/theme'
import {
  View,
  Text,
  StyleSheet,
  Modal,
  ImageBackground,
  TouchableOpacity
} from 'react-native'
import { Icon } from 'react-native-elements'
import Header from '@common/header'

const AppModal = () => {
  const { modal, objectId } = useContext(Route.State)
  const dispatch = useContext(Route.Dispatch)

  const { data, loading } = useQuery(GetEvent, {
    variables: { id: objectId },
    skip: !objectId
  })

  return (
    <Modal visible={modal}>
      {loading ? (
        <View style={styles.container}>
          <Text style={styles.text}>App Modal</Text>
          <Text style={styles.text}>App Modal</Text>
          <Text style={styles.text}>App Modal</Text>
          <Text style={styles.text}>App Modal</Text>
          <Text style={styles.text}>App Modal</Text>
          <Text style={styles.text}>App Modal</Text>
          <Text style={styles.text}>App Modal</Text>
          <Text style={styles.text}>App Modal</Text>
        </View>
      ) : (
        <View style={styles.container}>
          <ImageBackground
            source={{ uri: data?.event.media[0].uri }}
            style={styles.image}
          >
            <Header>
              <TouchableOpacity
                onPress={() => dispatch({ type: 'closeModal' })}
                style={styles.iconContainer}
              >
                <Icon
                  type="ionicon"
                  name="ios-arrow-back"
                  color={theme.color.tertiary}
                />
              </TouchableOpacity>
              <View />
              <View />
            </Header>
          </ImageBackground>
        </View>
      )}
    </Modal>
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
  text: {
    color: theme.color.tertiary
  },
  image: {
    flex: 1,
    resizeMode: 'cover'
  }
})

export default AppModal
