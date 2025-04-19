import React from "react"
import { initializeApp} from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage"

const firebaseConfig = {
    apiKey: "AIzaSyDX3juWKWA2NU-pv7VA9qyO3LPeYYRZV9Y",
    authDomain: "task-management-app-cdd2f.firebaseapp.com",
    projectId: "task-management-app-cdd2f",
    storageBucket: "task-management-app-cdd2f.firebasestorage.app",
    messagingSenderId: "363956632950",
    appId: "1:363956632950:web:d6241f613eeaf4840b8e57"
};

export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);