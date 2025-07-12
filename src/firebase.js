// src/firebase.js

import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// ✅ Replace with your Firebase config:
const firebaseConfig = {
  apiKey: "AIzaSyAZXvVoXd2MUMSIhGYYH6XxFgIg3q9ElZ0",
  authDomain: "lost-and-found-46d0a.firebaseapp.com",
  projectId: "lost-and-found-46d0a",
  storageBucket: "lost-and-found-46d0a.appspot.com", // <-- fixed typo here too
  messagingSenderId: "996397483551",
  appId: "1:996397483551:web:3019a6a62526a4880f372a",
  measurementId: "G-0P9L4QQYZS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Add these:
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
