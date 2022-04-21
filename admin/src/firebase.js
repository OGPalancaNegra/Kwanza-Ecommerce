// Import the functions you need from the SDKs you need
import { initializeApp } from "@firebase/app";
//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB8EUSSvpdoq1oLo7iqR8REdUx-7E2Mh5Y",
  authDomain: "ecommerce1-fc429.firebaseapp.com",
  projectId: "ecommerce1-fc429",
  storageBucket: "ecommerce1-fc429.appspot.com",
  messagingSenderId: "45585671217",
  appId: "1:45585671217:web:9a870fbf9ca3a4d5092110",
  measurementId: "G-L96R0TNX64"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);


export default app