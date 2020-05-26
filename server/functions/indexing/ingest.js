const functions = require('firebase-functions')
const { firestore } = require('../services/firebase')
const SearchIndex = require('../services/algolia')

const IndexModels = require('../indexing/models')
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
        user = IndexModels.user(doc.data())
        users.push(user)
      })
    )
    .catch(e => console.log(e))
  await SearchIndex.users.clearObjects()
  await SearchIndex.users.setSettings({
    attributesForFaceting: ['id']
  })
  await SearchIndex.users.saveObjects(users)

  // Index Events
  await eventsRef
    .get()
    .then(snap =>
      snap.forEach(doc => {
        event = IndexModels.event(doc.data())
        events.push(event)
      })
    )
    .catch(e => console.log(e))
  await SearchIndex.events.clearObjects()
  await SearchIndex.events.saveObjects(events)

  res.status(200).send('Indexed!')
}

const updateUserIndex = functions.firestore
  .document('users/{userId}')
  .onWrite(async change => {
    let user = change.after.exists ? change.after.data() : null

    if (!user) {
      // User deleted
      user = change.before.data()
      await SearchIndex.users.deleteObject(user.id)
    } else {
      // User created or modified
      user = IndexModels.user(user)
      await SearchIndex.users.saveObject(user)
    }
  })

const updateEventIndex = functions.firestore
  .document('events/{eventId}')
  .onWrite(async change => {
    let event = change.after.exists ? change.after.data() : null

    if (!event) {
      // Event deleted
      event = change.before.data()
      await SearchIndex.events.deleteObject(event.id)
    } else {
      // Event created or modified
      // TODO: Decide what data to update
      // i.e: Index should not update every "like"
      event = IndexModels.event(event)
      await SearchIndex.events.saveObject(event)
    }
  })

module.exports = {
  indexAll,
  indexing,
  updateEventIndex,
  updateUserIndex
}
