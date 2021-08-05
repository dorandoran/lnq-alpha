import React from 'react'
import PropTypes from 'prop-types'

import { TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native'
import { Icon } from 'react-native-elements'
import { theme } from '@util'

const HeaderButton = ({
  backgroundColor,
  color,
  borderColor,
  containerStyle,
  onPress,
  type,
  name,
  size,
  disabled,
  loading
}) => {
  const extraStyles = {
    backgroundColor: disabled
      ? theme.color.disabled
      : theme.color[backgroundColor] || backgroundColor,
    color: theme.color[color] || color,
    borderWidth: borderColor ? 2 : 0,
    borderColor: borderColor ? theme.color[borderColor] : 'transparent'
  }

  return (
    <TouchableOpacity
      style={[styles.container, { ...extraStyles }, containerStyle]}
      onPress={onPress}
      disabled={disabled}
    >
      {loading ? (
        <ActivityIndicator size='small' color={theme.color.secondary} />
      ) : (
        <Icon
          type={type}
          name={name}
          color={theme.color[color] || color}
          size={size}
        />
      )}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 25,
    width: 35,
    height: 35,
    justifyContent: 'center'
  }
})

HeaderButton.propTypes = {
  backgroundColor: PropTypes.string,
  color: PropTypes.string,
  borderColor: PropTypes.string,
  containerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  onPress: PropTypes.func,
  type: PropTypes.string,
  name: PropTypes.string,
  size: PropTypes.number,
  disabled: PropTypes.bool,
  loading: PropTypes.bool
}

export default HeaderButton
