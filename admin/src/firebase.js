// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCtpJwHKOsYIDYiuh3W9qmh5Jj76O4_Q8w",
  authDomain: "mern-shop-3b2fe.firebaseapp.com",
  projectId: "mern-shop-3b2fe",
  storageBucket: "mern-shop-3b2fe.appspot.com",
  messagingSenderId: "877899575799",
  appId: "1:877899575799:web:483adca558a1ef46577ef2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app