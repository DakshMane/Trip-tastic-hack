// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { signInWithPopup } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth/web-extension";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDJ7nCKF1Y2T6Ybl-Tb7XTL5qEvedlNGhw",
  authDomain: "triptastic-8825c.firebaseapp.com",
  projectId: "triptastic-8825c",
  storageBucket: "triptastic-8825c.firebasestorage.app",
  messagingSenderId: "990624326445",
  appId: "1:990624326445:web:374416a83382f77da7e9a4",
  measurementId: "G-2BN0CZSPEX"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);