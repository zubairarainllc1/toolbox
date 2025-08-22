// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  "projectId": "toolbox-3xwz4",
  "appId": "1:101223683718:web:4c0418fca8ea5fc8956307",
  "storageBucket": "toolbox-3xwz4.firebasestorage.app",
  "apiKey": "AIzaSyCaSzGFsFcFCuVNfk5xbymEJANQzpslPg4",
  "authDomain": "toolbox-3xwz4.firebaseapp.com",
  "measurementId": "",
  "messagingSenderId": "101223683718"
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db };
