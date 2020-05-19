import React from 'react'
import PropTypes from 'prop-types'

import { View, StyleSheet } from 'react-native'

const NewSuggested = ({ userId, nextPressed, goNext }) => {
  return <View style={styles.container}></View>
}

const styles = StyleSheet.create({
  container: {
    height: '75%',
    justifyContent: 'center',
    alignItems: 'center'
  }
})

NewSuggested.propTypes = {
  userId: PropTypes.string,
  nextPressed: PropTypes.bool,
  goNext: PropTypes.func
}

export default NewSuggested
