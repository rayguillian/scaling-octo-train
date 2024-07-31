import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDCg9_c-OIBU82hnmC4Zyn5p8QUDmcoo1Q",
  authDomain: "sukaza-63ca4.firebaseapp.com",
  projectId: "sukaza-63ca4",
  storageBucket: "sukaza-63ca4.appspot.com",
  messagingSenderId: "278066198090",
  appId: "1:278066198090:web:dfd94da17cc746016518b3",
  measurementId: "G-0CEEE9SBS6"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
