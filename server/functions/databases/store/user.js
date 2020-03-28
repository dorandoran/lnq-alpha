const firestore = require('../firestore')
const { Timestamp } = require('@google-cloud/firestore')

const usersRef = firestore.collection('users')

const saveToDb = user => {
  user.events = []
  user.created_at = Timestamp.now()

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
