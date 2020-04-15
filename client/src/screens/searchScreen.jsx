import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { Route } from '@context/routeStore'

import { useQuery } from '@apollo/react-hooks'
import { GetEvent } from '@graphql/event/queries.graphql'

import { theme } from '@src/theme'
import { ScrollView, StyleSheet, ActivityIndicator } from 'react-native'
import { Card, ListItem } from 'react-native-elements'

const TEST_ID = 'VXD9Pm7Qg6yKOo9fSNdE'

const SearchScreen = () => {
  const dispatch = useContext(Route.Dispatch)
  const { data, loading } = useQuery(GetEvent, {
    variables: { id: TEST_ID }
  })

  if (loading)
    return <ActivityIndicator size="large" color={theme.color.secondary} />

  if (!data?.event) return <ActivityIndicator size="large" color="blue" />
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Card>
        <ListItem
          title={data.event.name}
          rightAvatar={{ source: data.event.media[0] }}
          onPress={() => dispatch({ type: 'openModal', payload: TEST_ID })}
        />
      </Card>
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
