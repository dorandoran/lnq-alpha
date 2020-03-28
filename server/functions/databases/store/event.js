const Firestore = require('@google-cloud/firestore')
const firestore = new Firestore({ projectId: 'lnq-alpha' })
const eventsRef = firestore.collection('events')

const saveToDb = event => {
  event.likes = 0

  return eventsRef
    .add(event)
    .then(doc => {
      return doc.id
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
  events = []

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
