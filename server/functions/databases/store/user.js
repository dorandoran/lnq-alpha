const { firestore } = require('../firebase')
const admin = require('firebase-admin')
const timestamp = admin.firestore.Timestamp

const usersRef = firestore().collection('users')

const saveToDb = user => {
  user.events = []
  user.created_at = timestamp.now()

  return usersRef
    .doc(user.id)
    .set(user)
    .then(() => {
      return user
    })
    .catch(e => {
      console.log(e)
      return null
    })
}

const findById = ({ id }) => {
  return usersRef
    .doc(id)
    .get()
    .then(doc => {
      if (doc.exists) {
        return doc.data()
      }
      return null
    })
    .catch(e => {
      console.log(e)
      return null
    })
}

const update = user => {}

module.exports = {
  saveToDb,
  findById
}
