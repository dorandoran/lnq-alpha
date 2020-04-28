import React from 'react'
import useNotification from '@hooks/useNotification'
import PropTypes from 'prop-types'

import { theme } from '@util'
import { View, StyleSheet } from 'react-native'
import { Card, Button } from 'react-native-elements'

const HomeScreen = () => {
  const { throwSuccess } = useNotification()

  return (
    <View style={styles.container}>
      <Card containerStyle={{ backgroundColor: theme.color.accent }}>
        <Button
          title='Success Notification Test'
          onPress={() => throwSuccess('This is a success!')}
        />
      </Card>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.color.background
  }
})

HomeScreen.propTypes = {}

export default HomeScreen
