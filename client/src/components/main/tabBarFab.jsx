import React, { Fragment, useState, useContext } from 'react'
import PropTypes from 'prop-types'
import { Route } from '@context/routeStore'

import { theme } from '@src/theme'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { Icon } from 'react-native-elements'

import ActionSelectMedia from '@components/create/utilComponents/actionSelectMedia'
import { CAMERA_SELECTION } from '@components/util/constants'

const TabBarFab = ({ mainFlowRef }) => {
  const [fabPosition, setFabPosition] = useState(null)
  const { tabBar } = useContext(Route.State)
  const dispatch = useContext(Route.Dispatch)
  const { fabButton } = tabBar

  const navigateToDetails = media => {
    // Passes media to <CreateDetails />
    mainFlowRef.current.navigate('Create', {
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
    height: 100,
    justifyContent: 'space-around'
  }
})

TabBarFab.propTypes = {
  mainFlowRef: PropTypes.object
}

export default TabBarFab
