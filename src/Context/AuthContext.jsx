import React from 'react'
import { signUpWithEmail, signInWithEmail, signOutUser, resetPassword, onAuthStateChangedListener } from "../services/firebaseAuth"
import { createContext, useState, useEffect, useContext} from "react"

const AuthContext = createContext()

const AuthProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(null)
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null)

    useEffect(() => {
        const unsub = onAuthStateChangedListener((user) => {
            setCurrentUser(user);
            setLoading(false);
        });
        return () => unsub();
    }, [])

    const logIn = async (email, password) =>{

        if (!email || !password){
            setError("Please enter your email and password");
            return;

        }
        try {
            await  signInWithEmail(email, password);
            setError(null);
        }catch(error){
            if(error.code === "auth/user-not-found"){
                console.error("This user does not exist");
                setError("This user does not exis!. Please sign up")
            }else if(error.code === "auth/wrong-password"){
                console.error("Wrong password");
                setError("Incorrect password, please input correct password")
            } else{
                console.error("Error signining in:", error);
            };
        }
    }
    const signUp = async (email, password, name) => {
        try {
            await signUpWithEmail(email, password, name);
            setError(null);
        } catch(error){
            console.error("Error signing up:", error);
            setError("Sign up failed. Please try again")
        }
    }

    const forgotPassword = async (email) => {
        try {
            await resetPassword(email);
            setError(null)
        }catch(error){
            console.error("Error reseting password:", error);
            setError("Failed to reset password. Please try again")
        }
    }
    const logOut = async () => {
        try {
            await signOutUser();
            setError(null);
        }catch(error){
             console.error("Error signing out:", error);
             setError("Error logging out, please try again")
        }
    }
  return (
     <AuthContext.Provider value={{ currentUser, logIn, signUp, logOut, forgotPassword, error}}>
        {!loading && children}
     </AuthContext.Provider>
  )
}

export const useAuth = () => {
    return useContext(AuthContext);
}

export default AuthProvider;