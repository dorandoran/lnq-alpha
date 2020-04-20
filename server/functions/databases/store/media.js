const { firestore } = require('../firebase')
const admin = require('firebase-admin')
const timestamp = admin.firestore.Timestamp

const mediaRef = firestore().collection('media')

const saveToDb = media => {
  media.created_at = timestamp.now()
  media.linkId = [media.linkId]

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

const findAllByLinkId = ({ linkId, avatarId }) => {
  let media = []

  return mediaRef
    .where('linkId', 'array-contains', linkId)
    .get()
    .then(snap => {
      snap.forEach(doc => {
        item = doc.data()
        item.id = doc.id
        media.push(item)
      })

      // Put avatar media first
      media.forEach((item, i) => {
        if (item.id === avatarId) {
          media.splice(i, 1)
          media.unshift(item)
        }
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
  findAllByLinkId
}
