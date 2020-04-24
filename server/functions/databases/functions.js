const functions = require('firebase-functions')
const Media = require('./store/media')

const cleanupMedia = functions.firestore
  .document('events/{eventId}')
  .onDelete(async snap => {
    const event = snap.data()
    await Media.deleteFromStore({ id: event.avatarId })
  })

module.exports = {
  cleanupMedia
}
