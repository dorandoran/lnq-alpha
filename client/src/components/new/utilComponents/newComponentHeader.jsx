import React from 'react'
import PropTypes from 'prop-types'

import { View, Text, StyleSheet } from 'react-native'
import { theme } from '@util'
import { componentMap } from '@components/new/utilComponents/newComponentMap'

const NewComponentHeader = ({ index }) => {
  return (
    <View style={styles.headerContainer}>
      <Text style={[styles.text, styles.header]}>
        {componentMap[index].header}
      </Text>
      <Text style={styles.text}>{componentMap[index].body}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  headerContainer: {
    height: '15%',
    paddingHorizontal: '5%',
    justifyContent: 'center'
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold'
  },
  text: {
    color: theme.color.tertiary,
    fontSize: 18
  }
})

NewComponentHeader.propTypes = {
  index: PropTypes.number
}

export default NewComponentHeader
