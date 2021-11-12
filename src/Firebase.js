import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";
import { getFirestore as getFS } from "@firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCYdQlTdgDUZe2ujf-qTonnDaaduKYPxxc",
  authDomain: "testweb-f4d19.firebaseapp.com",
  projectId: "testweb-f4d19",
  storageBucket: "testweb-f4d19.appspot.com",
  messagingSenderId: "648975947064",
  appId: "1:648975947064:web:1bcebf632c4a35b1961dcd",
  measurementId: "G-SJ9T4MNQN8",
};

const app = initializeApp(firebaseConfig);
export const authService = getAuth(app);
export const firestoreService = getFirestore(app);
export const firestorageService = getStorage(app);
export const db = getFS();