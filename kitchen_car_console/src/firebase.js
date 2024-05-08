import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD6MAHwvQzE5gS0CG_B3uAojaQ6x6vcE3w",
  authDomain: "arupaka-kitchen-car.firebaseapp.com",
  projectId: "arupaka-kitchen-car",
  storageBucket: "arupaka-kitchen-car.appspot.com",
  messagingSenderId: "293088357677",
  appId: "1:293088357677:web:980c96d2fa67f5ac9237a4",
  measurementId: "G-MPKDYGENCY"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app)
const db = getFirestore(app);


export { auth, analytics ,db}