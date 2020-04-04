const { firestore } = require('../firebase')
const admin = require('firebase-admin')
const timestamp = admin.firestore.Timestamp

const mediaRef = firestore().collection('media')

const saveToDb = media => {
  media.created_at = timestamp.now()

  return mediaRef
    .doc(media.id)
    .set(media)
    .then(() => {
      return media
    })
    .catch(e => {
      console.log(e)
      return null
    })
}

const findById = ({ id }) => {
  return mediaRef
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

const findByLinkId = ({ linkId }) => {
  let media = []

  return mediaRef
    .where('linkId', '==', linkId)
    .get()
    .then(snap => {
      snap.forEach(doc => {
        item = doc.data()
        item.id = doc.id
        media.push(item)
      })
      return media
    })
    .catch(e => {
      console.log(e)
      return media
    })
}

module.exports = {
  saveToDb,
  findById,
  findByLinkId
}
