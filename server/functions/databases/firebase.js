const admin = require('firebase-admin')
const serviceAccount = require('../config/credentials.json')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://lnq-alpha.firebaseio.com'
})

module.exports = {
  firestore: () => admin.firestore()
}
