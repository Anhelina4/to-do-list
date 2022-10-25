// Import the functions you need from the SDKs you need

import { getAuth } from 'firebase/auth'
import { initializeApp } from 'firebase/app'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAzXc5d8BD2CRn4G-trJxl-epW6-WE3-rM',
  authDomain: 'to-do-list-7795f.firebaseapp.com',
  projectId: 'to-do-list-7795f',
  storageBucket: 'to-do-list-7795f.appspot.com',
  messagingSenderId: '12725861414',
  appId: '1:12725861414:web:5d2c6b7d7384817c157ae7'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
