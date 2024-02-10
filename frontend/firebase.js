import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {


  apiKey: "AIzaSyD7ZZ9wUJTKE9aN1lWqJLPOYy0GcnfowmM",
  authDomain: "arupaka-test.firebaseapp.com",
  projectId: "arupaka-test",
  storageBucket: "arupaka-test.appspot.com",
  messagingSenderId: "139345550217",
  appId: "1:139345550217:web:7dd95c3bbe6001f16b5f58",
  measurementId: "G-PS0XJNR4QK"

};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);