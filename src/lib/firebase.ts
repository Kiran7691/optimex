import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCbs9ydNkTHYgEA4OhXAyALXXDY3TqyUMM",
  authDomain: "testimpact-44908.firebaseapp.com",
  projectId: "testimpact-44908",
  storageBucket: "testimpact-44908.firebasestorage.app",
  messagingSenderId: "644289146599",
  appId: "1:644289146599:web:617f2f5a3696fbf1a4fc42"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);