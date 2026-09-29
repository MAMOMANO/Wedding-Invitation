import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCe96PoeBl3Z1hrUPRr2-RPysA0OK734ug",
  authDomain: "wedding-56c4c.firebaseapp.com",
  projectId: "wedding-56c4c",
  storageBucket: "wedding-56c4c.firebasestorage.app",
  messagingSenderId: "1003811971760",
  appId: "1:1003811971760:web:f8662d5a6653ef1420d175",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
