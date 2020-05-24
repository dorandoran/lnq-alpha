import React, { useContext } from 'react'
import NotificationContext from '@context/notificationContext'
import { useDebounce } from '@hooks/useDebounce'

import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator
} from 'react-native'
import { Icon } from 'react-native-elements'
import { theme, SCREEN_WIDTH, SCREEN_HEIGHT } from '@util'

const typeMap = {
  success: {
    type: 'material-community',
    name: 'check',
    color: theme.color.success
  },
  error: {
    type: 'material-community',
    name: 'exclamation',
    color: theme.color.error
  },
  warning: {
    type: 'material-community',
    name: 'exclamation',
    color: theme.color.warning
  }
}

const Notification = () => {
  const { notificationState, notificationDispatch } = useContext(
    NotificationContext
  )
  const { message, type, open, loading, hideIndicator } = notificationState
  const typeStyles = typeMap[type]

  useDebounce(
    () => notificationDispatch({ type: 'closeNotification' }),
    4000,
    open
  )

  if (!open && !loading) return null

  // Loading notification component
  if (loading) {
    return (
      <View style={[styles.container, styles.full]}>
        {!hideIndicator && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size='large' color={theme.color.secondary} />
          </View>
        )}
      </View>
    )
  }

  // Normal notification
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => notificationDispatch({ type: 'closeNotification' })}
    >
      <View
        style={[styles.iconContainer, { backgroundColor: typeStyles.color }]}
      >
        <Icon
          type={typeStyles.type}
          name={typeStyles.name}
          color={theme.color.tertiary}
        />
      </View>
      <View style={styles.notificationContainer}>
        <Text style={styles.text}>{message}</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 100,
    right: 0,
    flexDirection: 'row',
    marginHorizontal: '2%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  full: {
    top: 0,
    height: SCREEN_HEIGHT,
    width: SCREEN_WIDTH,
    backgroundColor: theme.color.shadow
  },
  loadingContainer: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25
  },
  notificationContainer: {
    backgroundColor: theme.color.accent,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: theme.color.tertiary,
    paddingVertical: '2%',
    paddingHorizontal: '4%',
    flex: 1
  },
  iconContainer: {
    padding: '2%',
    borderRadius: 50,
    borderWidth: 2,
    borderColor: theme.color.tertiary,
    aspectRatio: 1,
    alignItems: 'center',
    marginRight: '1%'
  },
  text: {
    marginBottom: 0,
    fontSize: 16,
    color: theme.color.tertiary,
    textAlign: 'center'
  }
})

export default Notification
