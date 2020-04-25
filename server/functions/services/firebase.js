const admin = require('firebase-admin')
const credentials = require('../config/credentials.json')

admin.initializeApp({
  credential: admin.credential.cert(credentials.google),
  storageBucket: 'lnq-alpha.appspot.com'
})

module.exports = {
  auth: () => admin.auth(),
  firestore: () => admin.firestore(),
  storage: () => admin.storage().bucket()
}
