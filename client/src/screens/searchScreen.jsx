import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { Route } from '@context/routeStore'

import { useQuery } from '@apollo/react-hooks'
import { GetUser } from '@graphql/user/queries'

import { theme } from '@src/theme'
import { ScrollView, StyleSheet, ActivityIndicator } from 'react-native'
import { Card, ListItem } from 'react-native-elements'
import { EVENT_CONST } from '@util/constants'

// const TEST_ID = '0vQcj0GKrKYAxmDJWAsn'

const SearchScreen = () => {
  const dispatch = useContext(Route.Dispatch)
  const { data, loading } = useQuery(GetUser)

  if (loading)
    return <ActivityIndicator size='large' color={theme.color.secondary} />

  if (!data?.user) return <ActivityIndicator size='large' color='blue' />
  const { user } = data

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {user.events.map(event => {
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
