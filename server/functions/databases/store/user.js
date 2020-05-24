const { firestore } = require('../../services/firebase')
const admin = require('firebase-admin')
const timestamp = admin.firestore.Timestamp

const usersRef = firestore().collection('users')

const saveToStore = user => {
  user.created_at = timestamp.now()
  user.new = true

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
  if (!id) return null
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

const update = updateInput => {
  const { id, updates } = updateInput
  return usersRef
    .doc(id)
    .update(updates)
    .then(() => findById({ id }))
    .catch(e => {
      console.log(e)
      return null
    })
}

module.exports = {
  saveToStore,
  findById,
  update
}
