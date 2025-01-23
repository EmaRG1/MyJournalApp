// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDQCByLLLuJd4pLEP13ZG9qR7oX8esA1w0',
  authDomain: 'todo-app-862f7.firebaseapp.com',
  projectId: 'todo-app-862f7',
  storageBucket: 'todo-app-862f7.firebasestorage.app',
  messagingSenderId: '165371742485',
  appId: '1:165371742485:web:0550321a4440f6070e811c'
};


// Initialize Firebase
export const FirebaseApp    = initializeApp(firebaseConfig);
export const FirebaseAuth   = getAuth(FirebaseApp)
export const CloudFirestore = getFirestore(FirebaseApp)