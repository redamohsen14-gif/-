// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA_GXcHiAro6mY2e50tqhgBsLjE9BfXe18",
  authDomain: "alshalawi-reda.firebaseapp.com",
  projectId: "alshalawi-reda",
  storageBucket: "alshalawi-reda.firebasestorage.app",
  messagingSenderId: "862676021965",
  appId: "1:862676021965:web:7fc40763bdb73dcaa42f84",
  measurementId: "G-FB4K0DYMNY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);