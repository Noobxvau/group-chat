import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDNGeN9V2qPaQFSDoWki5ieH6uwtyTuoWI",
  authDomain: "telegram2-97c0b.firebaseapp.com",
  projectId: "telegram2-97c0b",
  storageBucket: "telegram2-97c0b.firebasestorage.app",
  messagingSenderId: "492607276736",
  appId: "1:492607276736:web:ae867b7767a8f3c272cf25",
  measurementId: "G-P3XVLG2FLP"
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);