const { firestore } = require('../../services/firebase')
const admin = require('firebase-admin')
const timestamp = admin.firestore.Timestamp

const usersRef = firestore().collection('users')
const eventsRef = firestore().collection('events')

const saveAllToDb = ({ type, senderId, recipientIds }) => {
  const writeBatch = firestore().batch()
  const documents = []
  // Sender: Events send invites, Follows send following/followers
  let collection = 'followers'
  let documentRef = usersRef.doc(senderId).collection('following')
  if (type === 'EVENT') {
    collection = 'invites'
    documentRef = eventsRef.doc(senderId).collection('invites')
  }

  recipientIds.forEach(recipientId => {
    let senderRef = documentRef.doc(recipientId)
    let recipientRef = usersRef
      .doc(recipientId)
      .collection(collection)
      .doc(senderId)
    // Create new document
    let document = {
      answer: 'REQUESTED',
      updated_at: timestamp.now()
    }

    if (type === 'EVENT') {
      senderRef = documentRef.doc()
      document.id = senderRef.id
      document.senderId = senderId
      document.recipientId = recipientId
    }

    writeBatch.set(senderRef, document)
    writeBatch.set(recipientRef, document)
    documents.push(document)
  })

  return writeBatch
    .commit()
    .then(() => {
      return documents
    })
    .catch(e => {
      // TODO: Error Handling
      console.log('invite batch error ', e)
      return null
    })
}

const findAllByEventId = async ({ eventId }) => {
  const invitesRef = await eventsRef.doc(eventId).collection('invites')
  let invites = []

  return invitesRef
    .get()
    .then(snap => {
      snap.forEach(doc => {
        invites.push(doc.data())
      })
      return invites
    })
    .catch(e => {
      console.log(e)
      return invites
    })
}

const findAllByUserId = async ({ userId }) => {
  const invitesRef = await usersRef.doc(userId).collection('invites')
  let invites = []

  return invitesRef
    .get()
    .then(snap => {
      snap.forEach(doc => {
        invites.push(doc.data())
      })
      return invites
    })
    .catch(e => {
      console.log(e)
      return invites
    })
}

module.exports = {
  saveAllToDb,
  findAllByEventId,
  findAllByUserId
}
