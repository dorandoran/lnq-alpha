import React from 'react'
import PropTypes from 'prop-types'

import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native'
import { theme } from '@util'

const NewBottomButtonBar = ({
  loading,
  disabled,
  showFinish,
  onSkipPress,
  onActionPress
}) => {
  const renderActionButton = () => {
    if (disabled) {
      return <View />
    }
    if (loading) {
      return (
        <View style={styles.loading}>
          <ActivityIndicator color={theme.color.secondary} />
        </View>
      )
    }
    return (
      <TouchableOpacity onPress={onActionPress}>
        <Text style={styles.text}>{showFinish ? 'Finish' : 'Next'}</Text>
      </TouchableOpacity>
    )
  }

  return (
    <View style={styles.footerContainer}>
      {onSkipPress && !showFinish ? (
        <TouchableOpacity onPress={onSkipPress}>
          <Text style={[styles.text, styles.skip]}>Skip</Text>
        </TouchableOpacity>
      ) : (
          <View />
        )}

      {renderActionButton()}
    </View>
  )
}

const styles = StyleSheet.create({
  footerContainer: {
    height: '10%',
    paddingHorizontal: '10%',
    paddingTop: '4%',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  loading: {
    justifyContent: 'flex-start'
  },
  text: {
    color: theme.color.tertiary,
    fontSize: 18
  },
  skip: {
    color: theme.color.accent
  }
})

NewBottomButtonBar.propTypes = {
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
  showFinish: PropTypes.bool,
  onSkipPress: PropTypes.func,
  onActionPress: PropTypes.func
}

export default NewBottomButtonBar
