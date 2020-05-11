import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const ProfileAccountStats = () => {
  return (
    <View style={styles.accountStats}>
      <View><Text style={styles.statsTextHead}>20</Text><Text style={styles.statsText}>Events</Text></View>
      <View><Text style={styles.statsTextHead}>1,000</Text><Text style={styles.statsText}>Following</Text></View>
      <View><Text style={styles.statsTextHead}>1m</Text><Text style={styles.statsText}>Followers</Text></View>
    </View>
  )
}

const styles = StyleSheet.create({
  accountStats: {
    backgroundColor: '#333',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 20,
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

export default ProfileAccountStats