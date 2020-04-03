import firebase from 'firebase'
import config from '@config'

const firebaseConfig = {
  apiKey: config.GOOGLE.API_KEY,
  authDomain: config.GOOGLE.AUTH_DOMAIN,
  databaseURL: config.GOOGLE.DATABASE_URL,
  projectId: config.GOOGLE.PROJECT_ID,
  storageBucket: config.GOOGLE.STORAGE_BUCKET,
  messagingSenderId: config.GOOGLE.MESSAGING_SENDER_ID,
  appId: config.GOOGLE.APP_ID,
  measurementId: config.GOOGLE.MEASUREMENT_ID
}

firebase.initializeApp(firebaseConfig)

export const f = firebase
export const database = firebase.database()
export const auth = firebase.auth()
export const storage = firebase.storage()
// export const firestore = firebase.firestore()
