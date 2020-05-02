import React, { Fragment, useState, useContext } from 'react'
import { Route } from '@context/routeStore'

import ActionSelectMedia from '@components/create/utilComponents/actionSelectMedia'

import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { Icon } from 'react-native-elements'
import { theme, navigate, CAMERA_SELECTION } from '@util'

const TabBarFab = () => {
  const [fabPosition, setFabPosition] = useState(null)
  const { tabBar } = useContext(Route.State)
  const dispatch = useContext(Route.Dispatch)
  const { fabButton } = tabBar

  const navigateToDetails = media => {
    // Passes media to <CreateDetails />
    navigate('Create', {
      screen: 'Create',
      params: { media }
    })
  }

  const toggleFabButton = () => {
    dispatch({ type: 'toggleTabBarFab' })
  }

  return (
    <Fragment>
      {fabButton && (
        <View style={[styles.fabContainer, fabPosition]}>
          <ActionSelectMedia
            type={CAMERA_SELECTION}
            navigateToDetails={navigateToDetails}
            closeIconContainer={toggleFabButton}
          />

          <ActionSelectMedia
            navigateToDetails={navigateToDetails}
            closeIconContainer={toggleFabButton}
          />
        </View>
      )}
      <TouchableOpacity
        activeOpacity={0.5}
        style={styles.iconContainer}
        onPress={toggleFabButton}
        onLayout={({ nativeEvent: { layout } }) => {
          // Sets position of hidden fabs based on the Create button
          if (!fabPosition) setFabPosition({ bottom: layout.height * 1.5 })
        }}
      >
        <Icon
          tabName='Create'
          type={fabButton ? 'material' : 'feather'}
          name={fabButton ? 'close' : 'plus'}
          color={theme.color.secondary}
          reverse
        />
      </TouchableOpacity>
    </Fragment>
  )
}

const styles = StyleSheet.create({
  iconContainer: {
    height: '90%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  fabContainer: {
    position: 'absolute',
    height: 120,
    justifyContent: 'space-around'
  }
})

export default TabBarFab
