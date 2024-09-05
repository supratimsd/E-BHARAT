// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getFirestore} from "firebase/firestore";
import {getAuth} from "firebase/auth";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBofLWDeNDTdRmyspl2zhfwmkhp4FnwA1g",
  authDomain: "ecommerce-d7722.firebaseapp.com",
  projectId: "ecommerce-d7722",
  storageBucket: "ecommerce-d7722.appspot.com",
  messagingSenderId: "496486416022",
  appId: "1:496486416022:web:7c43cb93648bd020d38cb7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const fireDB=getFirestore(app);
const fireAuth=getAuth(app);
export {fireDB,fireAuth}