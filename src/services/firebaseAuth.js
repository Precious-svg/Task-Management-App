import React from 'react'
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendPasswordResetEmail, onAuthStateChanged} from "firebase/auth"
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { app } from "./firebase";


const auth = getAuth(app);

export const signUpWithEmail = async(email, password, name) => {
    try{
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        await setDoc(doc(db, "users", user.uid), {
            uid: user.uid,
            email: user.email,
            createdAt: Date.now(),
            displayName: name || ""
        });
        return user;

    } catch(error){
        throw error;
    }
};

export const signInWithEmail = async(email, password) => {
    try{
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        console.log("Logged in as:", user.email)
    } catch(error){
        throw error;
    };
}

export const resetPassword = async(email) => {
    try{
        const userCredential = await sendPasswordResetEmail(auth, email);
        const user = userCredential.user;
        console.log("This is the user email:", user.email)
    } catch(error){
        console.error("Failed to fetch user email");
        throw error;
    };
}

export const signOutUser = async () => {
    await signOut(auth);
}

// check auth state

export const onAuthStateChangedListener = (callback) => {
    return onAuthStateChanged(auth, callback)
}