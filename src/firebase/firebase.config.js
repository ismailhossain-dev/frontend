import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyAPZlCVcuwFTlwzC9q-rcPkNW1m-igi_HE",
  authDomain: "bookcourier-9881e.firebaseapp.com",
  projectId: "bookcourier-9881e",
  storageBucket: "bookcourier-9881e.firebasestorage.app",
  messagingSenderId: "123540854118",
  appId: "1:123540854118:web:083c313f3e9e21097064a7",
  measurementId: "G-DCEYR997FD",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
