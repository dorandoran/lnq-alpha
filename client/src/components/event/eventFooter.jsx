import React from 'react'
import PropTypes from 'prop-types'

import { View, StyleSheet, Pressable } from 'react-native'
import { Icon } from 'react-native-elements'
import { HeaderButton } from '@common'
import { theme, SCREEN_HEIGHT } from '@util'

const EventFooter = ({ modalActions }) => {
  // Temporary save state
  const [saved, setSaved] = React.useState(false)

  return (
    <React.Fragment>
      <View style={styles.socialContainer}>
        <HeaderButton
          type='entypo'
          name='ticket'
          color='tertiary'
          backgroundColor='secondary'
          onPress={() => {}}
        />
        <HeaderButton
          type='material-community'
          name={saved ? 'bookmark' : 'bookmark-outline'}
          color={saved ? theme.color.secondary : theme.color.tertiary}
          backgroundColor={theme.color.shadow}
          onPress={() => setSaved(!saved)}
          size={30}
        />
        <HeaderButton
          type='material-community'
          name='share-outline'
          color='tertiary'
          backgroundColor={theme.color.shadow}
          onPress={() => {}}
          size={32}
        />
      </View>
      <Pressable
        style={styles.fabContainer}
        onPress={modalActions.openAddMedia}
      >
        <Icon
          type='feather'
          name='plus'
          color={theme.color.secondary}
          reverse
        />
      </Pressable>
    </React.Fragment>
  )
}

const styles = StyleSheet.create({
  socialContainer: {
    position: 'absolute',
    bottom: SCREEN_HEIGHT + 25,
    left: 25,
    width: '45%',
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  fabContainer: {
    position: 'absolute',
    bottom: SCREEN_HEIGHT + 10,
    right: 30
  }
})

EventFooter.propTypes = {
  modalActions: PropTypes.object
}

export default EventFooter
