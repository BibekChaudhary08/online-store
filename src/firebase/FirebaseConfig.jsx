import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {getAuth} from "firebase/auth";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDFdLa1IGSaYpPVP4N_OxYJfhVlpgUcTMw",
  authDomain: "onlinestore-9f777.firebaseapp.com",
  projectId: "onlinestore-9f777",
  storageBucket: "onlinestore-9f777.appspot.com",
  messagingSenderId: "738460470537",
  appId: "1:738460470537:web:633264fd23d3495f9317d8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const fireDB = getFirestore(app);
const auth = getAuth(app);

export {fireDB, auth};