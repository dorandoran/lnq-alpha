import React from 'react'
import PropTypes from 'prop-types'

import { View, StyleSheet, TouchableOpacity, Text } from 'react-native'
import { theme } from '@util'

const Tabs = ({ currentTab, setTab, tabs }) => {
  const isSelectedStyles = value => {
    if (currentTab === value) {
      return { backgroundColor: theme.color.secondary }
    }
  }

  const extraButtonStyles = {
    width: `${(100 / tabs.length).toFixed(2)}%`
  }

  return (
    <View style={styles.container}>
      {tabs.map(tab => {
        return (
          <TouchableOpacity
            key={tab}
            style={[
              styles.buttonContainer,
              extraButtonStyles,
              isSelectedStyles(tab)
            ]}
            onPress={() => setTab(tab)}
          >
            <Text style={styles.text}>{tab}</Text>
          </TouchableOpacity>
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginTop: 15,
    marginHorizontal: 15,
    backgroundColor: theme.color.accent,
    borderRadius: 25
  },
  buttonContainer: {
    paddingVertical: 10,
    borderRadius: 25
  },
  text: {
    color: theme.color.tertiary,
    fontWeight: 'bold',
    textAlign: 'center'
  }
})

Tabs.propTypes = {
  tabs: PropTypes.array.isRequired,
  currentTab: PropTypes.string,
  setTab: PropTypes.func
}

export default Tabs
