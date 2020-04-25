import React, { Fragment, useContext } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { Search } from '@graphql/search/queries'
import SearchContext, { actions } from '@context/searchContext'

import EventList from '@components/search/searchEventList'
import CategoryBar from '@components/search/searchCategoryBar'

import { theme } from '@src/theme'
import { StyleSheet, FlatList, View } from 'react-native'
import { SearchBar } from 'react-native-elements'
import { Loading } from '@common'

const searchMap = [
  {
    key: 'searchBar'
  },
  {
    key: 'imageList'
  },
  {
    key: 'categoryBar'
  },
  {
    key: 'eventList'
  }
]

const SearchView = () => {
  const { searchState, dispatch } = useContext(SearchContext)
  const { query } = searchState

  const { data, loading } = useQuery(Search, {
    variables: { bucket: 'events' }
  })

  if (loading) return <Loading />
  if (!data) return null

  return (
    <Fragment>
      <SearchBar
        placeholder='Search'
        value={query}
        onChangeText={text =>
          dispatch({ type: actions.updateQuery, payload: text })
        }
        containerStyle={styles.containerStyle}
        inputContainerStyle={styles.inputContainer}
      />
      <CategoryBar />
      <FlatList
        data={searchMap}
        keyExtractor={item => item.key}
        renderItem={({ item }) => {
          const { key } = item

          // if (key === 'searchBar') {
          //   return (
          //     <SearchBar
          //       placeholder='Search'
          //       // value={search}
          //       // onChangeText={setSearch}
          //       containerStyle={styles.containerStyle}
          //       inputContainerStyle={styles.inputContainer}
          //     />
          //   )
          // }

          // if (key === 'categoryBar') {
          //   return <CategoryBar />
          // }

          if (key === 'eventList') {
            return <EventList events={data.search} />
          }
        }}
      />
    </Fragment>
  )
}

const styles = StyleSheet.create({
  containerStyle: {
    backgroundColor: theme.color.background,
    marginBottom: '5%'
  },
  inputContainer: {
    backgroundColor: theme.color.accent,
    borderRadius: 25,
    paddingLeft: '3%',
    borderBottomWidth: 0
  }
})

export default SearchView
