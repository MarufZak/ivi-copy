import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD_S5Y8nu60EJYeWVkxTnHO2NqlRsHtdB4",
  authDomain: "ivi-copy.firebaseapp.com",
  projectId: "ivi-copy",
  storageBucket: "ivi-copy.appspot.com",
  messagingSenderId: "448689185550",
  appId: "1:448689185550:web:7251301218fe2ebc71ad5f",
  measurementId: "G-6DXGFCRQFZ",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
// const analytics = getAnalytics(app);
