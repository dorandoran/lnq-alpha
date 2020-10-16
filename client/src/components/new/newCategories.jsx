/* eslint-disable react/prop-types */
import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

import useUpdateUser from '@graphql/user/useUpdateUser'
import useNotification from '@hooks/useNotification'

import DraggableFlatList from 'react-native-draggable-flatlist'
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native'
import BottomBar from '@components/new/utilComponents/newBottomButtonBar'
import { SCREEN_HEIGHT, SCREEN_WIDTH, theme } from '@util'
import {
  categoryMap,
  formatCategories
} from '@components/new/utilComponents/newUtil'

const NewCategories = ({ userId, goNext }) => {
  const [data, setData] = React.useState(categoryMap)
  const { throwLoading, closeNotification } = useNotification()
  const [updateUser] = useUpdateUser({
    onCompleted: () => {
      closeNotification()
      goNext()
    }
  })

  const handleNext = () => {
    throwLoading()
    const updates = { categories: formatCategories(data) }
    updateUser({ id: userId, updates })
  }

  const renderItem = ({ item, drag, index }) => {
    return (
      <View style={styles.itemContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.text}>{index + 1}</Text>
        </View>
        <TouchableOpacity
          style={[
            styles.touchContainer,
            { backgroundColor: item.backgroundColor }
          ]}
          onLongPress={drag}
          delayLongPress={100}
        >
          <Text style={styles.text}>{item.label}</Text>
        </TouchableOpacity>
      </View>
    )
  }

  const handleDrag = ({ data }) => {
    setData(data)
  }

  return (
    <Fragment>
      <View style={styles.container}>
        <DraggableFlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={item => item.value}
          onDragEnd={handleDrag}
        />
      </View>
      <BottomBar onActionPress={handleNext} />
    </Fragment>
  )
}

const styles = StyleSheet.create({
  container: {
    height: '75%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  itemContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginVertical: 5
  },
  touchContainer: {
    height: SCREEN_HEIGHT / 12,
    width: SCREEN_WIDTH / 1.25,
    borderWidth: 2,
    borderRadius: 15,
    borderColor: theme.color.tertiary,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textContainer: {
    borderWidth: 2,
    borderRadius: 25,
    aspectRatio: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    width: 25,
    borderColor: theme.color.tertiary
  },
  text: {
    color: theme.color.tertiary
  }
})

NewCategories.propTypes = {
  userId: PropTypes.string,
  nextPressed: PropTypes.bool,
  goNext: PropTypes.func
}

export default NewCategories
