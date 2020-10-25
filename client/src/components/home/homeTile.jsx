import React from 'react'
import PropTypes from 'prop-types'

import { View, StyleSheet, Text, TouchableOpacity, ImageBackground } from 'react-native'
import { Image } from 'react-native-elements'

import { theme, formatDateTime, SCREEN_HEIGHT } from '@util'
import { calcTileDimension } from '@components/home/utilComponents/homeUtil'

const HomeTile = ({ id, date, avatar, owner, name, column, tier = 0 }) => {
  const dimensions = calcTileDimension({ column, tier })

  return (
    <TouchableOpacity key={id} onPress={() => console.log(name)}>
      <ImageBackground source={{ uri: avatar.uri }} style={[styles.tile, dimensions]} borderRadius={10} >
        <View style={styles.avatarContainer}>
          <Image source={{ uri: owner.avatar.uri }} style={styles.avatar} borderRadius={25} />
        </View>
        <View style={styles.tileInfo}>
          <Text style={styles.itemText}>{name}</Text>
          <Text style={styles.itemText}>{formatDateTime({ date })}</Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.color.background
  },
  columnContainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'blue'
  },
  avatarContainer: {
    position: 'absolute',
    top: 10,
    right: 10
  },
  itemText: {
    color: theme.color.tertiary,
    fontSize: 18
  },
  tile: {
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  tileInfo: {
    width: '100%',
    height: SCREEN_HEIGHT / 10,
    backgroundColor: theme.color.shadow,
    justifyContent: 'space-around',
  },
  avatar: {
    height: SCREEN_HEIGHT / 25,
    width: SCREEN_HEIGHT / 25,
    borderWidth: 1,
    borderColor: theme.color.tertiary,
    borderRadius: 50
  },
})

HomeTile.propTypes = {
  id: PropTypes.string,
  date: PropTypes.object,
  avatar: PropTypes.object,
  owner: PropTypes.object,
  name: PropTypes.string,
  column: PropTypes.string,
  tier: PropTypes.number
}

export default HomeTile