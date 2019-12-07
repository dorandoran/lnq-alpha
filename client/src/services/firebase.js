import firebase from 'firebase'

const firebaseConfig = {
  apiKey: 'AIzaSyC1V1JZUnk_L_13zV4P6A96mCh3I87z9Ko',
  authDomain: 'lnq-alpha.firebaseapp.com',
  databaseURL: 'https://lnq-alpha.firebaseio.com',
  projectId: 'lnq-alpha',
  storageBucket: 'lnq-alpha.appspot.com',
  messagingSenderId: '650252507366',
  appId: '1:650252507366:web:231fe87e0bc720d7ab4327',
  measurementId: 'G-9WDTZ5KMXJ'
}


export const initializeFirebase = () => {
  firebase.initializeApp(firebaseConfig)
}
  