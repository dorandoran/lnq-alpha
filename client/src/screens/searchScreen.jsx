import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { Route } from '@context/routeStore'

import { useQuery } from '@apollo/react-hooks'
import { GetUserEvents } from '@graphql/event/queries'

import { theme } from '@src/theme'
import { ScrollView, StyleSheet, ActivityIndicator } from 'react-native'
import { Card, ListItem } from 'react-native-elements'
import { EVENT_CONST } from '@util/constants'
import { Loading } from '@common'

const SearchScreen = () => {
  const dispatch = useContext(Route.Dispatch)
  const { data, loading } = useQuery(GetUserEvents)

  if (loading) return <Loading />

  if (!data?.getUserEvents) {
    return <ActivityIndicator size='large' color='blue' />
  }
  const { getUserEvents: events } = data

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {events.map(event => {
        const { id, media, name } = event

        return (
          <Card key={id}>
            <ListItem
              title={name}
              rightAvatar={media.length ? { source: media[0] } : null}
              onPress={() =>
                dispatch({
                  type: 'openModal',
                  payload: { id, type: EVENT_CONST }
                })
              }
            />
          </Card>
        )
      })}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.color.background
  },
  text: {
    color: theme.color.tertiary
  }
})

SearchScreen.propTypes = {
  navigation: PropTypes.object
}

export default SearchScreen
