const { firestore } = require('../../services/firebase')
const admin = require('firebase-admin')
const timestamp = admin.firestore.Timestamp

const invitesRef = firestore().collection('invites')

const saveAllToDb = ({ senderId, recipientIds, eventId }) => {
  const writeBatch = firestore().batch()
  const invites = []

  recipientIds.forEach(recipientId => {
    const inviteId = `${senderId}-${recipientId}`
    const inviteRef = invitesRef.doc(inviteId)

    // Create new invite
    const invite = {
      id: inviteId,
      type: 'INVITE',
      senderId,
      recipientId,
      eventId,
      answer: 'REQUESTED',
      updated_at: timestamp.now()
    }

    // Add to write batch
    writeBatch.set(inviteRef, invite)
    invites.push(invite)
  })

  return writeBatch
    .commit()
    .then(() => {
      return documents
    })
    .catch(e => {
      // TODO: Error Handling
      console.log(e)
      return null
    })
}

const findAllByEventId = async ({ eventId }) => {
  let invites = []

  return invitesRef
    .where('eventId', '==', eventId)
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

const findAllByUserId = ({ userId }) => {
  let invites = []

  return invitesRef
    .where('recipientId', '==', userId)
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
