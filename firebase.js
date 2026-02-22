// Import Firebase SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-auth.js";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA_GXcHiAro6mV2e50tqhgBsLje9BFxe18",
  authDomain: "alshalawi-reda.firebaseapp.com",
  projectId: "alshalawi-reda",
  storageBucket: "alshalawi-reda.appspot.com",
  messagingSenderId: "862670621965",
  appId: "1:862670621965:web:7fc40763bdb73dcaa42f84",
  measurementId: "G-FB4K0DYMNY"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
