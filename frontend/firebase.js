import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {


  // apiKey: "AIzaSyD7ZZ9wUJTKE9aN1lWqJLPOYy0GcnfowmM",
  // authDomain: "arupaka-test.firebaseapp.com",
  // projectId: "arupaka-test",
  // storageBucket: "arupaka-test.appspot.com",
  // messagingSenderId: "139345550217",
  // appId: "1:139345550217:web:7dd95c3bbe6001f16b5f58",
  // measurementId: "G-PS0XJNR4QK"

  apiKey: "AIzaSyD8Ooc6zNnIK3tm_3mi1e4tzmjVSsNi2Hw",
  authDomain: "arukuarupaka-6e101.firebaseapp.com",
  projectId: "arukuarupaka-6e101",
  storageBucket: "arukuarupaka-6e101.appspot.com",
  messagingSenderId: "345656246915",
  appId: "1:345656246915:web:a57de8a3ad3a85ac7c51b6",
  measurementId: "G-XWS4GZFPNB"

};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);



export {auth,db}