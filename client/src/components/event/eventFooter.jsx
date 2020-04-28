import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

import { theme } from '@util'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { Icon } from 'react-native-elements'
import { SCREEN_HEIGHT } from '@util/constants'

const EventFooter = ({ event, open, toggleOpen }) => {
  // Temporary save state
  const [saved, setSaved] = React.useState(false)

  return (
    <Fragment>
      {!open ? (
        <View style={styles.iconContainer}>
          <TouchableOpacity
            onPress={() => {}}
            style={[styles.container, styles.ticket]}
          >
            <Icon type='entypo' name='ticket' color={theme.color.tertiary} />
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleOpen} style={styles.container}>
            <Icon
              type='material-community'
              name='chevron-up'
              color={theme.color.tertiary}
              size={30}
            />
          </TouchableOpacity>
        </View>
      ) : (
        <View style={[styles.iconContainer, styles.openMenu]}>
          <TouchableOpacity
            onPress={() => {}}
            style={[styles.container, styles.ticket]}
          >
            <Icon type='entypo' name='ticket' color={theme.color.tertiary} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setSaved(!saved)}
            style={styles.container}
          >
            <Icon
              type='material-community'
              name={saved ? 'bookmark' : 'bookmark-outline'}
              color={saved ? theme.color.secondary : theme.color.tertiary}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {}} style={styles.container}>
            <Icon
              type='material-community'
              name='share-outline'
              color={theme.color.tertiary}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleOpen} style={styles.container}>
            <Icon
              type='material-community'
              name='chevron-down'
              color={theme.color.tertiary}
              size={30}
            />
          </TouchableOpacity>
        </View>
      )}
    </Fragment>
  )
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 25,
    aspectRatio: 1,
    justifyContent: 'center'
  },
  iconContainer: {
    position: 'absolute',
    bottom: SCREEN_HEIGHT + 25,
    right: 20,
    height: SCREEN_HEIGHT / 10,
    width: 35,
    justifyContent: 'space-around',
    backgroundColor: theme.color.shadow,
    borderRadius: 25,
    padding: 2
  },
  ticket: {
    backgroundColor: theme.color.secondary
  },
  openMenu: {
    height: SCREEN_HEIGHT / 5
  }
})

EventFooter.propTypes = {
  event: PropTypes.object,
  open: PropTypes.bool,
  toggleOpen: PropTypes.func
}

export default EventFooter
