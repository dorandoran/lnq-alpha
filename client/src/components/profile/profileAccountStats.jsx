import React from 'react'
import PropTypes from 'prop-types'

import useUser from '@context/userContext'

import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

const ProfileAccountStats = ({
  handleOpenEvents,
  handleOpenFollowing,
  handleOpenFollowers
}) => {
  const { user } = useUser()

  return (
    <View style={styles.accountStats}>
      <TouchableOpacity onPress={handleOpenEvents}>
        <Text style={styles.statsTextHead}>{user.numEvents}</Text>
        <Text style={styles.statsText}>Events</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleOpenFollowers}>
        <Text style={styles.statsTextHead}>{user.numFollowers}</Text>
        <Text style={styles.statsText}>Followers</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleOpenFollowing}>
        <Text style={styles.statsTextHead}>{user.numFollowing}</Text>
        <Text style={styles.statsText}>Following</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  accountStats: {
    backgroundColor: '#333',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: '2%',
    paddingHorizontal: 30
  },
  statsTextHead: {
    color: 'white',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 6
  },
  statsText: {
    color: 'white',
    textAlign: 'center'
  }
})

ProfileAccountStats.propTypes = {
  handleOpenEvents: PropTypes.func.isRequired,
  handleOpenFollowing: PropTypes.func.isRequired,
  handleOpenFollowers: PropTypes.func.isRequired
}

export default ProfileAccountStats
