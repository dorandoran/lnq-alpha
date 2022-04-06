const { firestore, storage } = require('../../services/firebase')
const admin = require('firebase-admin')
const timestamp = admin.firestore.Timestamp

const mediaRef = firestore().collection('media')

const saveToStore = media => {
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

const deleteFromStore = ({ id, linkId, bucket }) => {
  const linkRef = firestore()
    .collection(bucket)
    .doc(linkId)

  // Firestore transaction
  firestore()
    .runTransaction(transaction => {
      // Read link data
      return transaction.get(linkRef).then(doc => {
        const link = doc.data()

        // If id to be deleted isn't the avatarId
        // Delete the media and resolve
        if (link.avatarId !== id) {
          transaction.delete(mediaRef.doc(id))
          return Promise.resolve()
        } else {
          // Else throw an error
          return Promise.reject(new Error('Cannot delete avatarId'))
        }
      })
    })
    .then(() => {
      // Then delete media from storage
      return storage()
        .file(`${bucket}/${id}`)
        .delete()
        .then(() => {
          return { completed: true, error: null }
        })
        .catch(e => {
          console.log(e)
          return { completed: false, error: e.message }
        })
    })
    .catch(e => {
      console.log(e)
      return { completed: false, error: e.message }
    })
}

module.exports = {
  saveToStore,
  findById,
  findAllByLinkId,
  deleteFromStore
}
