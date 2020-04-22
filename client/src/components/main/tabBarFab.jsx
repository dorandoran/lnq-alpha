import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types'

import { theme } from '@src/theme'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { Icon } from 'react-native-elements'

import ActionSelectMedia from '@components/create/utilComponents/actionSelectMedia'
import { CAMERA_SELECTION } from '@components/util/constants'

const TabBarFab = ({ mainFlowRef }) => {
  const [fabPosition, setFabPosition] = useState(null)
  const [showButton, setShowButton] = useState(false)

  const navigateToDetails = media => {
    // Passes media to <CreateDetails />
    mainFlowRef.current.navigate('Create', {
      screen: 'Create',
      params: { media }
    })
  }

  return (
    <Fragment>
      {showButton && (
        <View style={[styles.fabContainer, fabPosition]}>
          <ActionSelectMedia
            type={CAMERA_SELECTION}
            navigateToDetails={navigateToDetails}
          />

          <ActionSelectMedia navigateToDetails={navigateToDetails} />
        </View>
      )}
      <TouchableOpacity
        activeOpacity={0.5}
        style={styles.iconContainer}
        onPress={() => setShowButton(!showButton)}
        onLayout={({ nativeEvent: { layout } }) => {
          // Sets position of hidden fabs based on the Create button
          if (!fabPosition) setFabPosition({ bottom: layout.height * 1.5 })
        }}
      >
        <Icon
          tabName='Create'
          type={showButton ? 'material' : 'feather'}
          name={showButton ? 'close' : 'plus'}
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
    position: 'absolute'
  }
})

TabBarFab.propTypes = {
  mainFlowRef: PropTypes.object
}

export default TabBarFab
