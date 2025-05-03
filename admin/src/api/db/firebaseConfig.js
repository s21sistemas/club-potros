import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyAxQEbSBtaSwO76yNhHpGst63jWZkqkzxE',
  authDomain: 'potros-632ee.firebaseapp.com',
  projectId: 'potros-632ee',
  storageBucket: 'potros-632ee.firebasestorage.app',
  messagingSenderId: '715399204517',
  appId: '1:715399204517:web:6f82c57e723c47931b074c'
}

// Inicializa Firebase
const app = initializeApp(firebaseConfig)

// Inicializa Firestore y Auth
const db = getFirestore(app)
const auth = getAuth(app)
const storage = getStorage(app)

export { app, auth, db, storage }
