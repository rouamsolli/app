export const Config = {
  API_URL: 'https://jsonplaceholder.typicode.com/',
}
import * as firebase from 'firebase'
import 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import app from 'react-native/template/App'
import { getFirestore } from 'firebase/firestore'
// Firebase config
const firebaseConfig = {
  apiKey: 'AIzaSyBGpOhQfYHEsdEnI0SbAEfHDgAjLCC4dbM',
  authDomain: 'myapp-2cfc7.firebaseapp.com',
  databaseURL: 'https://myapp-2cfc7-default-rtdb.firebaseio.com',
  projectId: 'myapp-2cfc7',
  storageBucket: 'myapp-2cfc7.appspot.com',
  messagingSenderId: '976822410504',
  appId: '1:976822410504:web:3a65736fa547e3a793a0bd',
  measurementId: 'G-831KZSH466',
}
// initialize firebase
if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig)
}
const auth = getAuth(app)
const database = getFirestore()
export { firebase }
