import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

import { View, StyleSheet } from 'react-native'
import { HeaderButton } from '@common'
import { theme } from '@util'
import { SCREEN_HEIGHT } from '@util/constants'

const EventFooter = ({ open, toggleOpen }) => {
  // Temporary save state
  const [saved, setSaved] = React.useState(false)

  return (
    <Fragment>
      {!open ? (
        <View style={styles.iconContainer}>
          <HeaderButton
            type='entypo'
            name='ticket'
            color='tertiary'
            backgroundColor='secondary'
            onPress={() => {}}
          />
          <HeaderButton
            type='material-community'
            name='chevron-up'
            color='tertiary'
            size={30}
            onPress={toggleOpen}
          />
        </View>
      ) : (
        <View style={[styles.iconContainer, styles.openMenu]}>
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
            onPress={() => setSaved(!saved)}
          />
          <HeaderButton
            type='material-community'
            name='share-outline'
            color='tertiary'
            onPress={() => {}}
          />
          <HeaderButton
            type='material-community'
            name='chevron-down'
            color='tertiary'
            size={30}
            onPress={toggleOpen}
          />
        </View>
      )}
    </Fragment>
  )
}

const styles = StyleSheet.create({
  iconContainer: {
    position: 'absolute',
    bottom: SCREEN_HEIGHT + 25,
    right: 20,
    height: SCREEN_HEIGHT / 10,
    justifyContent: 'space-around',
    backgroundColor: theme.color.shadow,
    borderRadius: 25,
    padding: 1
  },
  openMenu: {
    height: SCREEN_HEIGHT / 5
  }
})

EventFooter.propTypes = {
  open: PropTypes.bool,
  toggleOpen: PropTypes.func
}

export default EventFooter
