// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCkZXfWV5_pQQVT1J1ytce87po_ap3dE-c",
  authDomain: "ar-fit-ad561.firebaseapp.com",
  projectId: "ar-fit-ad561",
  storageBucket: "ar-fit-ad561.firebasestorage.app",
  messagingSenderId: "625031688221",
  appId: "1:625031688221:web:31e767e30272f83ed2d6f4",
  measurementId: "G-E3YN43WT6R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
