import React from 'react'
import PropTypes from 'prop-types'

import ItemList from '@components/shared/itemList'
import { View, Text, StyleSheet } from 'react-native'
import { Header, HeaderButton } from '@common'
import { theme } from '@util'

const ItemListModal = ({
  query,
  noDataMessage,
  filterList,
  handleBackPress,
  handleItemPress,
  handleRightPress,
  headerTitle = ''
}) => {
  return (
    <View style={styles.container}>
      <Header position='relative'>
        <HeaderButton
          type='material'
          name='chevron-left'
          color='tertiary'
          backgroundColor='shadow'
          onPress={handleBackPress}
          size={30}
        />
        <Text style={styles.header}>{headerTitle}</Text>
        {handleRightPress && (
          <HeaderButton
            type='ionicon'
            name='ios-text'
            color='tertiary'
            backgroundColor='shadow'
            onPress={handleRightPress}
          />
        )}
      </Header>
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
    height: '90%',
    width: '100%',
    backgroundColor: theme.color.background,
    borderRadius: 25,
    paddingTop: '3%'
  },
  header: {
    color: theme.color.tertiary,
    fontWeight: 'bold',
    fontSize: 18
  }
})

ItemListModal.propTypes = {
  query: PropTypes.object,
  noDataMessage: PropTypes.string,
  filterList: PropTypes.func,
  handleItemPress: PropTypes.func,
  handleBackPress: PropTypes.func.isRequired,
  handleRightPress: PropTypes.func,
  headerTitle: PropTypes.string
}

export default ItemListModal
