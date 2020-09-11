const { firestore } = require('../../services/firebase')

const admin = require('firebase-admin')
const timestamp = admin.firestore.Timestamp

const usersRef = firestore().collection('users')

const TYPE = {
  INVITE: 'invite',
  COHOST: 'cohost',
  FOLLOW: 'follow',
  RSVP: 'rsvp',
  COMMENT: 'comment'
}

const saveToStore = ({ userId, senderId, type }) => {
  const notification = {
    senderId,
    type,
    viewed: false,
    created_at: timestamp.now()
  }

  return usersRef
    .doc(userId)
    .collection('notifications')
    .add(notification)
    .then(() => {
      return notification
    })
    .catch(e => {
      console.log(e)
      return null
    })
}

module.exports = {
  TYPE,
  saveToStore
}
