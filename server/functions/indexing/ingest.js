const functions = require('firebase-functions')
const { firestore } = require('../databases/firebase')
const SearchIndex = require('./algolia')

const template = require('./template')

const indexing = (req, res) => {
  res.status(200).send(template())
}

const indexAll = async (req, res) => {
  const usersRef = firestore().collection('users')
  const eventsRef = firestore().collection('events')

  const users = []
  const events = []

  // Index Users
  await usersRef
    .get()
    .then(snap =>
      snap.forEach(doc => {
        user = doc.data()
        user.objectID = user.id // Algolia search id key
        users.push(user)
      })
    )
    .catch(e => console.log(e))

  await SearchIndex.user.saveObjects(users)

  // Index Events
  await eventsRef
    .get()
    .then(snap =>
      snap.forEach(doc => {
        event = doc.data()
        event.objectID = event.id // Algolia search id key
        events.push(event)
      })
    )
    .catch(e => console.log(e))

  await SearchIndex.event.saveObjects(events)

  res.status(200).send('Indexed!')
}

const updateEventIndex = functions.firestore
  .document('events/{eventId}')
  .onWrite(async change => {
    let event = change.after.exists ? change.after.data() : null

    if (!event) {
      // Event deleted
      event = change.before.data()
      await SearchIndex.event.deleteObject(event.id)
    } else {
      // Event created or modified
      // TODO: Decide what data to update
      // i.e: Index should not update every like
      event.objectID = event.id
      await SearchIndex.event.saveObject(event)
    }
  })

const updateUserIndex = functions.firestore
  .document('users/{userId}')
  .onWrite(async change => {
    let user = change.after.exists ? change.after.data() : null

    if (!user) {
      // User deleted
      user = change.before.data()
      await SearchIndex.user.deleteObject(user.id)
    } else {
      // User created or modified
      user.objectID = user.id
      await SearchIndex.user.saveObject(user)
    }
  })

module.exports = {
  indexAll,
  indexing,
  updateEventIndex,
  updateUserIndex
}
