// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAyr7-sNsYLOpJfuDp7-HKtQRk2WvbRUX8",
  authDomain: "parttimematch.firebaseapp.com",
  projectId: "parttimematch",
  storageBucket: "parttimematch.appspot.com",
  messagingSenderId: "334982395495",
  appId: "1:334982395495:web:76aab0f08326af25d2c6c2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;