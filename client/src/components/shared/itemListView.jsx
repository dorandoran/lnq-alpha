import React from 'react'
import PropTypes from 'prop-types'

import ItemList from '@components/shared/itemList'
import { View, StyleSheet } from 'react-native'
import { theme } from '@util'

const ItemListView = ({
  type,
  data,
  query,
  noDataMessage,
  filterList,
  handleItemPress
}) => {
  return (
    <View style={styles.container}>
      <ItemList
        type={type}
        data={data}
        query={query}
        noDataMessage={noDataMessage}
        filterList={filterList}
        onItemPress={handleItemPress}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.color.background
  },
  header: {
    color: theme.color.tertiary,
    fontWeight: 'bold',
    fontSize: 18
  }
})

ItemListView.propTypes = {
  type: PropTypes.string,
  data: PropTypes.array,
  query: PropTypes.object,
  noDataMessage: PropTypes.string,
  filterList: PropTypes.func,
  handleItemPress: PropTypes.func
}

export default ItemListView
