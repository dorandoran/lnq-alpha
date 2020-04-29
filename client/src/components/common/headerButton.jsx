import React from 'react'
import PropTypes from 'prop-types'

import { TouchableOpacity, StyleSheet } from 'react-native'
import { Icon } from 'react-native-elements'
import { theme } from '@util'

const HeaderButton = ({
  backgroundColor,
  color,
  containerStyle,
  onPress,
  type,
  name,
  size
}) => {
  backgroundColor = theme.color[backgroundColor] || backgroundColor
  color = theme.color[color] || color

  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor }, containerStyle]}
      onPress={onPress}
    >
      <Icon type={type} name={name} color={color} size={size} />
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
  containerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  onPress: PropTypes.func,
  type: PropTypes.string,
  name: PropTypes.string,
  size: PropTypes.number
}

export default HeaderButton
