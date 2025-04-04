import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCkZXfWV5_pQQVT1J1ytce87po_ap3dE-c",
  authDomain: "ar-fit-ad561.firebaseapp.com",
  databaseURL: "https://ar-fit-ad561-default-rtdb.firebaseio.com",
  projectId: "ar-fit-ad561",
  storageBucket: "ar-fit-ad561.firebasestorage.app",
  messagingSenderId: "625031688221",
  appId: "1:625031688221:web:31e767e30272f83ed2d6f4",
  measurementId: "G-E3YN43WT6R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore and Authentication
export const db = getFirestore(app);
export const auth = getAuth(app);
