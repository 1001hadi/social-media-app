// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAo-godGiMyb3QMHZ3Ji6gIYlHgEQLFlpQ",
  authDomain: "react-chat-app-cbb6c.firebaseapp.com",
  projectId: "react-chat-app-cbb6c",
  storageBucket: "react-chat-app-cbb6c.appspot.com",
  messagingSenderId: "800372455736",
  appId: "1:800372455736:web:61fb135ab27e2a7c11a9cd",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
