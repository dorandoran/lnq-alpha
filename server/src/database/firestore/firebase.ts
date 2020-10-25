import admin from 'firebase-admin'
import credentials from '../../config/credentials.json'

const serviceAccount = credentials.google as admin.ServiceAccount

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'lnq-alpha.appspot.com'
})

export const auth = admin.auth
export const firestore = admin.firestore
export const timestamp = admin.firestore.Timestamp
