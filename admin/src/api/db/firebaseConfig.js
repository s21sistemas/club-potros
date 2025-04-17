import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyCepGR5AoV8rVcay5Y-T4KItOJ-YqRRKLk',
  authDomain: 'clubpotros-f28a5.firebaseapp.com',
  projectId: 'clubpotros-f28a5',
  storageBucket: 'clubpotros-f28a5.firebasestorage.app',
  messagingSenderId: '650568328185',
  appId: '1:650568328185:web:f9c5283d502df85d7ad328',
  measurementId: 'G-LDX9FQH6ED'
}

// Inicializa Firebase
const app = initializeApp(firebaseConfig)

// Inicializa Firestore y Auth
const db = getFirestore(app)
const auth = getAuth(app)
const storage = getStorage(app)

export { app, auth, db, storage }
