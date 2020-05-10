const functions = require('firebase-functions')
const { auth } = require('../services/firebase')
const Media = require('./store/media')

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

const cleanupUser = functions.firestore
  .document('users/{userId}')
  .onDelete(async snap => {
    const user = snap.data()
    // TODO: Add Error Handling
    await auth().deleteUser(user.id)
  })

module.exports = {
  cleanupMedia,
  cleanupUser
}
