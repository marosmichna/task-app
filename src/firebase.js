// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.FIREBASE_TASK_APP_KEY,
 // apiKey:"AIzaSyBClZpFK9-zqNAc_y3MsChO9xk63RxYNVY",
  authDomain: "fir-task-app-3a111.firebaseapp.com",
  projectId: "fir-task-app-3a111",
  storageBucket: "fir-task-app-3a111.appspot.com",
  messagingSenderId: "1097599475000",
  appId: "1:1097599475000:web:4fba6ea71edd9771cc35cd",
  measurementId: "G-0FWVVJ4YVC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)