const { firestore } = require('../../services/firebase')
const Follow = require('../../databases/store/follow.js')
const Invite = require('../../databases/store/invite')

const admin = require('firebase-admin')
const timestamp = admin.firestore.Timestamp
const FieldValue = admin.firestore.FieldValue

const usersRef = firestore().collection('users')
const eventsRef = firestore().collection('events')

const saveToStore = ({ userId, recipientIds, avatar, followIds, ...event }) => {
  const writeBatch = firestore().batch()
  event.likes = 0
  event.created_at = timestamp.now()
  event.avatarId = avatar.id

  // Create Event
  writeBatch.set(eventsRef.doc(event.id), event)
  // Update numEvents
  writeBatch.update(usersRef.doc(userId), {
    numEvents: FieldValue.increment(1)
  })
  // Send Follows
  Invite.saveAllToDb({ senderId: event.id, recipientIds })
  Follow.saveAllToDb({ senderId: userId, recipientIds: followIds })

  // Add avatar back to event
  event.avatar = avatar
  console.log('event ', event)
  return writeBatch
    .commit()
    .then(() => {
      return event
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
