import { initializeApp, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  docRef,
  deleteDoc,
} from "firebase/firestore";
import { getStorage, ref, uploadBytes } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD8Ooc6zNnIK3tm_3mi1e4tzmjVSsNi2Hw",
  authDomain: "arukuarupaka-6e101.firebaseapp.com",
  projectId: "arukuarupaka-6e101",
  storageBucket: "arukuarupaka-6e101.appspot.com",
  messagingSenderId: "345656246915",
  appId: "1:345656246915:web:a57de8a3ad3a85ac7c51b6",
  measurementId: "G-XWS4GZFPNB",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const firebaseApp = getApp();
const storage = getStorage();

export {
  auth,
  db,
  storage,
  collection,
  addDoc,
  ref,
  uploadBytes,
  getDocs,
  doc,
  updateDoc,
  docRef,
  deleteDoc,
};
