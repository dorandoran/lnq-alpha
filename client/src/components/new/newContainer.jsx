import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import useUser from '@context/userContext'

import Avatar from '@components/new/newAvatar'

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { theme, ADJUSTED_HEIGHT, SCREEN_WIDTH } from '@util'

const NewContainer = () => {
  // Programmatically scroll to inputs
  const scrollToInput = node => {
    this.newScroll.props.scrollToFocusedInput(node)
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={[styles.text, styles.header]}>Choose a profile photo</Text>
        <Text style={styles.text}>
          Choose your favorite selfie, make it fun!
        </Text>
      </View>
      <KeyboardAwareScrollView
        enableOnAndroid
        innerRef={ref => (this.newScroll = ref)}
        contentContainerStyle={{ flex: 1 }}
      >
        <Avatar />
      </KeyboardAwareScrollView>
      <View style={styles.footerContainer}>
        <TouchableOpacity>
          <Text style={[styles.text, styles.skip]}>Skip</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.text}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: ADJUSTED_HEIGHT,
    width: SCREEN_WIDTH
  },
  headerContainer: {
    height: '20%',
    paddingHorizontal: '5%',
    justifyContent: 'flex-end'
  },
  footerContainer: {
    height: '5%',
    paddingHorizontal: '10%',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold'
  },
  text: {
    color: theme.color.tertiary,
    fontSize: 18
  },
  skip: {
    color: theme.color.accent
  }
})

NewContainer.propTypes = {
  id: PropTypes.string,
  isDialogOpen: PropTypes.bool
}

export default NewContainer
