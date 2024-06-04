// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDLh9TqUmh4066l03x3H4gqgZgborvJ3hU",
  authDomain: "netflixgpt-e45b2.firebaseapp.com",
  projectId: "netflixgpt-e45b2",
  storageBucket: "netflixgpt-e45b2.appspot.com",
  messagingSenderId: "793791444376",
  appId: "1:793791444376:web:7ea56afe6254c37d7727ed",
  measurementId: "G-XYBFF1S7B2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();
