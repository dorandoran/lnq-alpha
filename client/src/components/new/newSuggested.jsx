import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

import { View, StyleSheet } from 'react-native'

import BottomBar from '@components/new/utilComponents/newBottomButtonBar'

const NewSuggested = ({ userId, goNext }) => {
  return (
    <Fragment>
      <View style={styles.container} />
      <BottomBar onActionPress={goNext} onSkipPress={goNext} />
    </Fragment>
  )
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
  goNext: PropTypes.func
}

export default NewSuggested
