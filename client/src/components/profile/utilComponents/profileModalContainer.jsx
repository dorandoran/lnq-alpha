import React from 'react'
import PropTypes from 'prop-types'

import ProfileModalNotificationContext, {
  ProfileModalNotificationProvider
} from '@context/profileModalNotificationContext'
import { useDebounce } from '@hooks/useDebounce'

import Modal from 'react-native-modal'
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native'
import { Icon } from 'react-native-elements'
import { theme } from '@util'

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

const ProfileModalContainer = ({ children, ...rest }) => {
  const { state, dispatch } = React.useContext(ProfileModalNotificationContext)
  const { message, type, open } = state
  const typeStyles = typeMap[type]

  useDebounce(() => dispatch({ type: 'closeNotification' }), 4000, open)

  const renderNotification = () => {
    if (open)
      return (
        <TouchableOpacity
          style={styles.container}
          onPress={() => dispatch({ type: 'closeNotification' })}
        >
          <View
            style={[
              styles.iconContainer,
              { backgroundColor: typeStyles.color }
            ]}
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

  return (
    <Modal {...rest}>
      {renderNotification()}
      {children}
    </Modal>
  )
}

const ContainerWrapper = props => {
  return (
    <ProfileModalNotificationProvider>
      <ProfileModalContainer {...props} />
    </ProfileModalNotificationProvider>
  )
}

ProfileModalContainer.propTypes = {
  children: PropTypes.node,
  isVisible: PropTypes.bool
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

export default ContainerWrapper
