const firestore = require('../firestore')
const { Timestamp } = require('@google-cloud/firestore')

const eventsRef = firestore.collection('events')

const saveToDb = event => {
  event.likes = 0
  event.created_at = Timestamp.now()

  return eventsRef
    .add(event)
    .then(doc => {
      event.id = doc.id
      return event
    })
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

const findByUserId = ({ userId }) => {
  let events = []

  return eventsRef
    .where('userId', '==', userId)
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

module.exports = {
  saveToDb,
  findById,
  findByUserId
}
