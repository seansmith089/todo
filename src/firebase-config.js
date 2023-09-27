import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

const api_key = process.env.REACT_API_KEY;

const firebaseConfig = {
  apiKey: api_key,
  authDomain: "todo-5452d.firebaseapp.com",
  projectId: "todo-5452d",
  storageBucket: "todo-5452d.appspot.com",
  messagingSenderId: "584870542676",
  appId: "1:584870542676:web:39bc1509a3319b2bdb9cc1",
  measurementId: "G-E28GQ5C3RE",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
