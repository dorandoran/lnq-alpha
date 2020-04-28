import React, { useContext } from 'react'
import { Route } from '@context/routeStore'

import { theme } from '@util'
import { View, StyleSheet, FlatList } from 'react-native'
import { ListItem } from 'react-native-elements'
import { Loading } from '@common'
import { BUCKET } from '@util/constants'

const SearchImageList = ({ events }) => {
  const dispatch = useContext(Route.Dispatch)

  if (!events) return <Loading />

  return (
    <View style={styles.container}>
      <FlatList
        data={events}
        keyExtractor={event => event.id}
        renderItem={({ item }) => {
          if (item.media.length) {
            const { id, name, media } = item
            return (
              <ListItem
                title={name}
                rightAvatar={media.length ? { source: media[0] } : null}
                onPress={() =>
                  dispatch({
                    type: 'openModal',
                    payload: { id, type: BUCKET.EVENT }
                  })
                }
              />
            )
          }
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    marginBottom: 20
  },
  image: {
    width: 200,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default SearchImageList
