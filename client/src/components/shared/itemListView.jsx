import React from 'react'
import PropTypes from 'prop-types'

import ItemList from '@components/shared/itemList'
import { View, StyleSheet } from 'react-native'
import { theme } from '@util'

const ItemListView = ({
  query,
  noDataMessage,
  filterList,
  handleItemPress
}) => {
  return (
    <View style={styles.container}>
      <ItemList
        type='users'
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
  query: PropTypes.object,
  noDataMessage: PropTypes.string,
  filterList: PropTypes.func,
  handleItemPress: PropTypes.func,
  handleBackPress: PropTypes.func.isRequired,
  handleRightPress: PropTypes.func,
  headerTitle: PropTypes.string
}

export default ItemListView
