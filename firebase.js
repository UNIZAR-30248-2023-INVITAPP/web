// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCbeI2rT4P9hvPjSvmj6vJr2Q-VHPDat3o",
  authDomain: "invitapp-13b6c.firebaseapp.com",
  projectId: "invitapp-13b6c",
  storageBucket: "invitapp-13b6c.appspot.com",
  messagingSenderId: "212401191901",
  appId: "1:212401191901:web:6a0fd2a91c06d199ff1434"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)
// Inicializar Firestore y exportar la instancia

const db = getFirestore(app);

export default db;