const { firestore } = require('../firebase')
const admin = require('firebase-admin')
const timestamp = admin.firestore.Timestamp

const usersRef = firestore().collection('users')
const eventsRef = firestore().collection('events')

const saveAllToDb = ({ recipientIds, eventId }) => {
  const writeBatch = firestore().batch()
  const invitesRef = eventsRef.doc(invite.eventId).collection('invites')
  const invites = []

  recipientIds.forEach(recipientId => {
    const docRef = invitesRef.doc()
    const userRef = usersRef
      .doc(recipientId)
      .collection('invites')
      .doc(docRef.id)

    const invite = {
      id: docRef.id,
      recipientId,
      eventId,
      answer: 'invited',
      updated_at: timestamp.now()
    }
    writeBatch.create(docRef, invite)
    writeBatch.create(userRef, invite)
    invites.push(invite)
  })

  return writeBatch
    .commit()
    .then(() => {
      return invites
    })
    .catch(e => {
      // TODO: Error Handling
      console.log(e)
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
