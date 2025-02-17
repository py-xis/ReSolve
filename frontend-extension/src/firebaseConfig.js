// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth} from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC2Yo7IwcmlPFtJmj70lOD2MpcUGtrtL4I",
  authDomain: "resolve-66ff2.firebaseapp.com",
  projectId: "resolve-66ff2",
  storageBucket: "resolve-66ff2.firebasestorage.app",
  messagingSenderId: "738574614240",
  appId: "1:738574614240:web:d04913caa20cddfc0c1a85",
  measurementId: "G-6DBMVRHL12"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);


export { auth };