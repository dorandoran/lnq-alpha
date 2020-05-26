const functions = require('firebase-functions')
const admin = require('firebase-admin')
const { auth, firestore } = require('../services/firebase')
const Media = require('./store/media')

const FieldValue = admin.firestore.FieldValue
const timestamp = admin.firestore.Timestamp
const usersRef = firestore().collection('users')

// Media Cleanup - Deletes Media attached to just-deleted Events
const cleanupMedia = functions.firestore
  .document('events/{eventId}')
  .onDelete(async snap => {
    const event = snap.data()
    // TODO: Add Error Handling
    const eventMedia = await Media.findAllByLinkId({ linkId: event.id })
    eventMedia.forEach(async media => {
      await Media.deleteFromStore({ id: media.id })
    })
  })

// User Cleanup - Deletes Users from authentication if deleted from firestore
const cleanupUser = functions.firestore
  .document('users/{userId}')
  .onDelete(async snap => {
    const user = snap.data()
    // TODO: Add Error Handling
    await auth().deleteUser(user.id)
  })

// If a user allows all follows, this function will automatically answer invitations
const allowFollowers = functions.firestore
  .document('users/{recipientId}/followers/{senderId}')
  .onCreate(change => {
    const follow = change.data()
    const recipientRef = usersRef.doc(follow.recipientId)
    const senderRef = usersRef.doc(follow.senderId)

    return firestore().runTransaction(transaction => {
      // Get Current User with follower
      return transaction
        .get(recipientRef)
        .then(doc => {
          const recipient = doc.data()
          const answerUpdate = {
            answer: 'ACCEPTED',
            updated_at: timestamp.now()
          }

          if (recipient.allowFollowers) {
            // Update recipient
            transaction.update(recipientRef, {
              numFollowers: FieldValue.increment(1)
            })
            transaction.update(
              recipientRef.collection('followers').doc(follow.senderId),
              answerUpdate
            )

            // Update sender
            transaction.update(senderRef, {
              numFollowing: FieldValue.increment(1)
            })
            transaction.update(
              senderRef.collection('following').doc(follow.recipientId),
              answerUpdate
            )
          }
          return Promise.resolve(
            `${follow.recipientId} allowed ${follow.senderId}`
          )
        })
        .then(result => console.log(result))
        .catch(e => console.log(e))
    })
  })

module.exports = {
  cleanupMedia,
  cleanupUser,
  allowFollowers
}
