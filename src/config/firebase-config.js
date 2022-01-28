import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD-qH_Dc1lLP4XQFjDew7NHjKVQF9UQz-I",
  authDomain: "rmad-assignment-1.firebaseapp.com",
  projectId: "rmad-assignment-1",
  storageBucket: "rmad-assignment-1.appspot.com",
  messagingSenderId: "926134347626",
  appId: "1:926134347626:web:8ee8e227fcb6f365fb2713",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
