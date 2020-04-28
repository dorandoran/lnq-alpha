import React, { Children } from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet } from 'react-native'
import { theme } from '@util'

const Header = ({
  children,
  position,
  backgroundColor,
  styleProps,
  rightStyleProps
}) => {
  const numChildren = Children.count(children)

  const addCustomStyles = () => {
    const customStyles = {}
    if (position) customStyles.position = position
    if (backgroundColor) customStyles.backgroundColor = backgroundColor
    return customStyles
  }

  const renderLeftSection = () => {
    if (numChildren < 1) return null
    return children[0]
  }

  const renderMiddleSection = () => {
    if (!numChildren) return null
    if (numChildren === 1) return children
    return children[1]
  }

  const renderRightSection = () => {
    if (numChildren < 2) return null
    return children[2]
  }

  return (
    <View style={[styles.container, addCustomStyles(), styleProps]}>
      <View style={[styles.section, styles.left]}>{renderLeftSection()}</View>
      <View style={[styles.section, styles.middle]}>
        {renderMiddleSection()}
      </View>
      <View style={[styles.section, styles.right, rightStyleProps]}>
        {renderRightSection()}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    flexDirection: 'row',
    height: '6%',
    backgroundColor: 'transparent',
    zIndex: theme.zIndex.header
  },
  section: {
    width: '33.33%',
    justifyContent: 'center'
  },
  left: {
    alignItems: 'flex-start',
    paddingLeft: '5%'
  },
  middle: {
    alignItems: 'center'
  },
  right: {
    alignItems: 'flex-end',
    paddingRight: '5%'
  }
})

Header.propTypes = {
  children: PropTypes.node.isRequired,
  position: PropTypes.string,
  backgroundColor: PropTypes.string,
  styleProps: PropTypes.object,
  rightStyleProps: PropTypes.object
}

export default Header
