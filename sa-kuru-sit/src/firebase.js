import firebase,{ initializeApp, getApp } from "firebase/app";
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
import 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyD8bvdURI9eTDyKxkxHu4gNhf4xKrxfseY",
  authDomain: "sa-kurukarennda.firebaseapp.com",
  projectId: "sa-kurukarennda",
  storageBucket: "sa-kurukarennda.appspot.com",
  messagingSenderId: "193473489800",
  appId: "1:193473489800:web:cd5c977621c6e74f36a83d",
  measurementId: "G-YLBNN0TWXK"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export {
  auth,
  db,
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
