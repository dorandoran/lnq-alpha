import React from 'react'
import useNotification from '@hooks/useNotification'
import PropTypes from 'prop-types'

import { theme } from '@src/theme'
import { View, Text, StyleSheet } from 'react-native'
import { Card, Button } from 'react-native-elements'

const HomeScreen = () => {
  const {
    throwSuccess,
    throwError,
    throwWarning,
    throwNotification
  } = useNotification()

  return (
    <View style={styles.container}>
      <Card containerStyle={{ backgroundColor: theme.color.accent }}>
        <Button
          title='Success Notification Test'
          onPress={() => throwSuccess('This is a success!')}
        />
      </Card>
      <Card containerStyle={{ backgroundColor: theme.color.accent }}>
        <Button
          title='Error Notification Test'
          onPress={() => throwError('This is an error!')}
        />
      </Card>
      <Card containerStyle={{ backgroundColor: theme.color.accent }}>
        <Button
          title='Warning Notification Test'
          onPress={() => throwWarning('This is a warning!')}
        />
      </Card>
      <Card containerStyle={{ backgroundColor: theme.color.accent }}>
        <Button
          title='Freestyle Notification Test'
          onPress={() =>
            throwNotification({
              message: 'This is a freestyle!',
              type: 'success'
            })
          }
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
