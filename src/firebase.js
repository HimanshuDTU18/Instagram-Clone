
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';

import { getStorage } from "firebase/storage";

console.log(process.env);

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: "instagram-clone-96e3e.firebaseapp.com",
  projectId: "instagram-clone-96e3e",
  storageBucket: "instagram-clone-96e3e.appspot.com",
  messagingSenderId: "241794948159",
  appId: "1:241794948159:web:37376dd53dbcaa66756c8a",
  measurementId: "G-D2RM8J8KBW"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {db };