const { firestore } = require('../../services/firebase')
const admin = require('firebase-admin')
const timestamp = admin.firestore.Timestamp

const followsRef = firestore().collection('follows')

const saveAllToStore = ({ senderId, recipientIds }) => {
  const writeBatch = firestore().batch()
  const follows = []

  recipientIds.forEach(recipientId => {
    const followId = `${senderId}-${recipientId}`
    const followRef = followsRef.doc(followId)

    // Create new follow
    const follow = {
      id: followId,
      type: 'FOLLOW',
      senderId,
      recipientId,
      answer: 'REQUESTED',
      updated_at: timestamp.now()
    }

    // Add to write batch
    writeBatch.set(followRef, follow)
    follows.push(follow)
  })

  return writeBatch
    .commit()
    .then(() => {
      return follows
    })
    .catch(e => {
      // TODO: Error Handling
      console.log(e)
      return null
    })
}

const findAllByUserId = ({ type, userId }) => {
  // type: SocialLinkType
  const searchKey = type === 'FOLLOWING' ? 'senderId' : 'recipientId'
  let follows = []

  return followsRef
    .where(searchKey, '==', userId)
    .get()
    .then(snap => {
      snap.forEach(doc => {
        follows.push(doc.data())
      })
      return follows
    })
    .catch(e => {
      console.log(e)
      return follows
    })
}

module.exports = {
  saveAllToStore,
  findAllByUserId
}
