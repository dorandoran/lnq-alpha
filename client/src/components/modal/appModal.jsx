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
  TouchableOpacity,
  ScrollView
} from 'react-native'
import { Icon } from 'react-native-elements'
import Constants from 'expo-constants'

import { Header } from '@common'
import Loading from '@common/loading'
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '@common/constants'
import ViewContainer from '@components/main/viewContainer'

const AppModal = () => {
  const { modal, objectId } = useContext(Route.State)
  const dispatch = useContext(Route.Dispatch)

  const { data, loading } = useQuery(GetEvent, {
    variables: { id: objectId },
    skip: !objectId
  })

  if (loading) {
    return <Loading />
  }

  return (
    <Modal visible={modal} statusBarTranslucent>
      <ViewContainer>
        <ScrollView
          style={[styles.container, styles.flex]}
          snapToInterval={SCREEN_HEIGHT - Constants.statusBarHeight}
        >
          <ImageBackground
            source={{ uri: data?.event.media[0].uri }}
            style={styles.image}
          >
            <View style={styles.imageContainer}>
              <Header position="relative">
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
                <TouchableOpacity
                  onPress={() => {}}
                  style={styles.iconContainer}
                >
                  <Icon
                    type="material-community"
                    name="menu"
                    color={theme.color.tertiary}
                  />
                </TouchableOpacity>
              </Header>
              <Header position="relative">
                <View />
                <View />
                <TouchableOpacity
                  onPress={() => {}}
                  style={styles.iconContainer}
                >
                  <Icon
                    type="ionicon"
                    name="ios-arrow-up"
                    color={theme.color.tertiary}
                  />
                </TouchableOpacity>
              </Header>
            </View>
          </ImageBackground>
          <View style={[styles.infoContainer, styles.image]}>
            <Text style={styles.text}>This is text</Text>
          </View>
        </ScrollView>
      </ViewContainer>
    </Modal>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.color.background
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'space-between'
  },
  infoContainer: {},
  iconContainer: {
    backgroundColor: theme.color.accent,
    aspectRatio: 1,
    padding: 3,
    borderRadius: 25
  },
  text: {
    color: theme.color.tertiary
  },
  image: {
    height: SCREEN_HEIGHT - 2 * Constants.statusBarHeight,
    width: SCREEN_WIDTH
  }
})

export default AppModal
