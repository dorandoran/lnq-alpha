const functions = require('firebase-functions')
const admin = require('firebase-admin')
const { auth, firestore } = require('../services/firebase')
const Media = require('./store/media')

const FieldValue = admin.firestore.FieldValue
const timestamp = admin.firestore.Timestamp
const usersRef = firestore().collection('users')
const followsRef = firestore().collection('follows')

// Media Cleanup - Deletes Media attached to just-deleted Events
const cleanupMedia = functions.firestore
  .document('events/{eventId}')
  .onDelete(async snap => {
    const event = snap.data()
    // TODO: Add Error Handling
    const eventMedia = await Media.findAllByLinkId({ linkId: event.id })
    eventMedia.forEach(async media => {
      await Media.deleteFromStore({
        id: media.id,
        linkId: event.id,
        bucket: 'events'
      })
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
  .document('follows/{followId}')
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
            // Update counts
            transaction.update(recipientRef, {
              numFollowers: FieldValue.increment(1)
            })
            transaction.update(senderRef, {
              numFollowing: FieldValue.increment(1)
            })

            // Update follow
            transaction.update(followsRef.doc(follow.id), answerUpdate)
            return Promise.resolve(
              `${follow.recipientId} allowed ${follow.senderId}`
            )
          }

          return Promise.resolve(
            `${follow.recipientId} does not auto-allow followers`
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
