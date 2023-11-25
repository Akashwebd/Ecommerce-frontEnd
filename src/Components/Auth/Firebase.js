import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBkVFAikC16NmociDnfKAfYnnhLap-9jr4",
  authDomain: "react-ecommerce-8c270.firebaseapp.com",
  projectId: "react-ecommerce-8c270",
  storageBucket: "react-ecommerce-8c270.appspot.com",
  messagingSenderId: "367871329247",
  appId: "1:367871329247:web:b1311db15ca907bf7b3a6a"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
console.log(firebase);

export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider(); 