// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD6HvCvpUVDtUXZp7h1KJ_gLk4gSP9ydJQ",
  authDomain: "tripmate-b15db.firebaseapp.com",
  projectId: "tripmate-b15db",
  storageBucket: "tripmate-b15db.firebasestorage.app",
  messagingSenderId: "48984698391",
  appId: "1:48984698391:web:d337560674e00991ca3652",
  measurementId: "G-77XX89WSDX",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Auth and export it — this is what LoginPage/RegisterPage import
export const auth = getAuth(app);