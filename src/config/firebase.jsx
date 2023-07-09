import { initializeApp } from "firebase/app";
import {getStorage} from "firebase/storage";
import {getAuth,GoogleAuthProvider} from 'firebase/auth';
import {getFirestore} from '@firebase/firestore';
 
const firebaseConfig = {
  apiKey: "AIzaSyAixTJibbxUu-_naGXm9lqBGUs3j1XSLWk",
  authDomain: "socio-c9a64.firebaseapp.com",
  projectId: "socio-c9a64",
  storageBucket: "socio-c9a64.appspot.com",
  messagingSenderId: "584847321587",
  appId: "1:584847321587:web:d95fc6d8750ac7a8bc8a86",
  measurementId: "G-65K6XE9H10"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const auth = getAuth(app);

const db = getFirestore(app);
const provider = new GoogleAuthProvider();
export { auth, provider, storage, db};
