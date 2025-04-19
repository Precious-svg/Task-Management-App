import React from 'react'
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged} from "firebase/auth"
import { app } from "./firebase";

const auth = getAuth(app);
export const signUpWithEmail = async(email, password) => {
    try{
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        return userCredential.user;
    } catch(error){
        console.error("Error signing up:", error)
        throw error;
    }
};

export const signInWithEmail = async(email, password) => {
    try{
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return userCredential.user;
    } catch(error){
        console.error("Error signining in:", error);
        throw error;
    }
}

export const signOutUser = async () => {
    await signOut(auth);
}

// check auth state

export const onAuthStateChangedListener = (callback) => {
    return onAuthStateChanged(auth, callback)
}