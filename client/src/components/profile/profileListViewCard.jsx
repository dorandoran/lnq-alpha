import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View, Text, Image } from 'react-native'
import { Icon } from 'react-native-elements'

const ProfileListViewCard = ({ dataName, dataLocation, dataTime, avatarImage }) => {
  const [imgFromData, setImgFromData] = useState()

  useEffect(() => {
    setImgFromData(avatarImage)
  }, [avatarImage])

  return (
    <View style={styles.cardContainer}>
      <View style={styles.eventPictureContainer}>
        {imgFromData? 
          <Image style={styles.cardImageStyling} source={imgFromData} /> :
        null}
      </View>
      <View style={styles.eventDetailContainer}>
        <View style={styles.eventDetail}>
          <Text style={styles.eventNameText}>{dataName}</Text>
          <View style={styles.iconTextLine}>
            <View style={styles.iconContainer}>
              <Icon name='place' type='material-icons' color='white' size={18} />
            </View>
            <Text style={styles.eventLocationText}>{dataLocation}</Text>
          </View>
          <View style={{ ...styles.iconTextLine, marginLeft: 2 }}>
            <View style={styles.iconContainer}>
              <Icon name='schedule' type='material-icons' color='white' size={15} />
            </View>
            <Text style={styles.eventTimeText}>{dataTime}</Text>
          </View>
        </View>
        <View >
          <Image style={styles.eventHostAvatar} source={imgFromData} />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  cardContainer: {
    padding: 10,
    flexDirection: 'row'
  },
  eventPictureContainer: {
    flex: 1/4,
    flexDirection: 'row',
    height: 100,
    width: 100,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    backgroundColor: '#333'
  },
  cardImageStyling: {
    flex: 1,
    width: '100%',
    height: 'auto',
    borderRadius: 8
    },
  eventDetailContainer: {
    flex: 3/4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    backgroundColor: '#333'
  },
  eventDetail: {
    flexDirection: 'column',
    marginVertical: 5,
    marginHorizontal: 10,
    alignSelf: 'center'
  },
  eventHostAvatar: {
    height: 30,
    width: 30,
    borderRadius: 30/2,
    borderWidth: 1,
    borderColor: 'white',
    backgroundColor: 'blue',
    margin: 8
  },
  eventNameText: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    marginVertical: 4
  },
  eventLocationText: {
    fontSize: 14,
    color: 'white',
    marginVertical: 4
  },
  eventTimeText: {
    fontSize: 14,
    color: 'white',
    marginVertical: 4
  },
  iconContainer: {
    paddingRight: 4,
    alignSelf: 'center'
  },
  iconTextLine: {
    flexDirection: 'row'
  }
})

ProfileListViewCard.propTypes = {
  dataName: PropTypes.string,
  avatarImage: PropTypes.number,
  dataLocation: PropTypes.string,
  dataTime: PropTypes.string
}

export default ProfileListViewCard