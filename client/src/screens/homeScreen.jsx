import React from 'react'
import PropTypes from 'prop-types'

import { useQuery } from '@apollo/client'
import { HomeSearch } from '@graphql/search/queries'

import { ScrollView, View, StyleSheet, Text, TouchableOpacity, ImageBackground } from 'react-native'
import { Image } from 'react-native-elements'
import { Loading } from '@common'
import { theme, formatDateTime, SCREEN_HEIGHT } from '@util'
import { calcTileDimension } from '@components/home/utilComponents/homeUtil'

const HomeScreen = () => {
  const { data, loading } = useQuery(HomeSearch)
  let leftColumn = []
  let rightColumn = []
  const noEvents = 'You haven\'t created any events yet!'

  const generateColumns = () => {
    const events = data.homeSearch
    events.forEach((event, i) => {
      if (i % 2) {
        rightColumn.push(Tile({ ...event, column: 'left' }))
      } else {
        leftColumn.push(Tile({ ...event, column: 'right' }))
      }
    })
  }

  if (loading) return <Loading />
  if (!data?.homeSearch || !data.homeSearch.length) {
    return <View style={styles.container}><Text style={styles.itemText}>{noEvents}</Text></View>
  }

  generateColumns()
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainerStyle}>
      <View styles={styles.columnContainer}>
        {leftColumn.map(item => item)}
      </View>
      <View styles={styles.columnContainer}>
        {rightColumn.map(item => item)}
      </View>
    </ScrollView>
  )
}

const Tile = ({ id, date, avatar, owner, name, column, tier = 0 }) => {
  const dimensions = calcTileDimension({ column, tier })

  return (
    <TouchableOpacity key={id} onPress={() => console.log(name)}>
      <ImageBackground source={{ uri: avatar.uri }} style={[styles.tile, dimensions]} borderRadius={10} >
        <View style={styles.avatarContainer}>
          <Image source={{ uri: owner.avatar.uri }} style={styles.avatar} borderRadius={25} />
        </View>
        <View style={styles.tileInfo}>
          <Text style={styles.tileText}>{name}</Text>
          <Text style={styles.tileText}>{formatDateTime({ date })}</Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  )
}

Tile.propTypes = {
  id: PropTypes.string,
  date: PropTypes.object,
  avatar: PropTypes.object,
  owner: PropTypes.object,
  name: PropTypes.string,
  column: PropTypes.string,
  tier: PropTypes.number
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.color.background
  },
  contentContainerStyle: {
    flexDirection: 'row'
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
  tileText: {
    color: theme.color.tertiary,
    fontSize: 15,
    paddingLeft: '2%'
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

HomeScreen.propTypes = {}

export default HomeScreen
