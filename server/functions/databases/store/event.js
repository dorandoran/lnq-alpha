const { firestore } = require('../../services/firebase')
const admin = require('firebase-admin')
const timestamp = admin.firestore.Timestamp

const usersRef = firestore().collection('users')
const eventsRef = firestore().collection('events')

const saveToStore = event => {
  const writeBatch = firestore().batch()
  const invitesRef = eventsRef.doc(event.id).collection('invites')
  const recipientIds = event.recipientIds || []
  const invites = []

  delete event.recipientIds
  event.likes = 0
  event.created_at = timestamp.now()

  writeBatch.set(eventsRef.doc(event.id), event)

  recipientIds.forEach(recipientId => {
    const docRef = invitesRef.doc()
    const userRef = usersRef
      .doc(recipientId)
      .collection('invites')
      .doc(docRef.id)

    const invite = {
      id: docRef.id,
      type: 'INVITE',
      recipientId,
      senderId: event.id,
      answer: 'REQUESTED',
      updated_at: timestamp.now()
    }
    writeBatch.create(docRef, invite)
    writeBatch.create(userRef, invite)
    invites.push(invite)
  })

  return writeBatch
    .commit()
    .then(() => {
      return findById(event)
    })
    .catch(e => {
      // TODO: Error Handling
      console.log(e)
      return null
    })
}

const update = updateInput => {
  const { id, updates } = updateInput
  return eventsRef
    .doc(id)
    .update(updates)
    .then(() => findById({ id }))
    .catch(e => {
      console.log(e)
      return null
    })
}

const findById = ({ id }) => {
  return eventsRef
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

const findAllByOwnerId = ({ ownerId }) => {
  let events = []

  return eventsRef
    .where('ownerId', '==', ownerId)
    .get()
    .then(snap => {
      snap.forEach(doc => {
        event = doc.data()
        event.id = doc.id
        events.push(event)
      })
      return events
    })
    .catch(e => {
      console.log(e)
      return events
    })
}

// TODO: Add security - check userId matches
const deleteFromStore = ({ id }) => {
  return eventsRef
    .doc(id)
    .delete()
    .then(() => true)
    .catch(e => {
      console.log(e)
      return false
    })
}

module.exports = {
  saveToStore,
  update,
  findById,
  findAllByOwnerId,
  deleteFromStore
}
