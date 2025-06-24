import React from "react"
import { initializeApp} from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage"

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "task-management-app-cdd2f.firebaseapp.com",
    projectId: "task-management-app-cdd2f",
    messagingSenderId: "363956632950",
    storageBucket: "task-management-app-cdd2f.firebasestorage.app",
    appId: "1:363956632950:web:d6241f613eeaf4840b8e57"
};

export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);