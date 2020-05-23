import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

import { SearchBar } from 'react-native-elements'
import { View, StyleSheet } from 'react-native'
import BottomBar from '@components/new/utilComponents/newBottomButtonBar'
import { theme } from '@util'

const NewFriends = ({ userId, goNext }) => {
  const [text, setText] = React.useState('')

  return (
    <Fragment>
      <View style={styles.container}>
        <SearchBar
          placeholder='Search'
          value={text}
          onChangeText={text => setText(text)}
          containerStyle={styles.containerStyle}
          inputContainerStyle={styles.inputContainer}
        />
      </View>
      <BottomBar onActionPress={goNext} showFinish />
    </Fragment>
  )
}

const styles = StyleSheet.create({
  container: {
    height: '75%',
    alignItems: 'center'
  },
  containerStyle: {
    backgroundColor: theme.color.background,
    width: '100%',
    marginBottom: '5%'
  },
  inputContainer: {
    backgroundColor: theme.color.accent,
    borderRadius: 25,
    paddingLeft: '3%',
    borderBottomWidth: 0
  }
})

NewFriends.propTypes = {
  userId: PropTypes.string,
  goNext: PropTypes.func
}

export default NewFriends
