import React from 'react'
import { signUpWithEmail, signInWithEmail, signOutUser, resetPassword, onAuthStateChangedListener, signInWithGoogle } from "../services/firebaseAuth"
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
            throw new Error ("Please enter your email and password");

        }
        try {
            await  signInWithEmail(email, password);
            setError(null);
        }catch(error){
            if(error.code === "auth/user-not-found"){
                throw new Error("This user does not exist! Please sign up.");
            }else if(error.code === "auth/wrong-password"){
                console.error("Wrong password");
                throw new Error("Incorrect password, please input correct password.");
            } else{
                throw new Error("Error signing in: " + error.message);
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

    const googleSignIn = async () => {
        try {
            const user = await signInWithGoogle();
            setError(null);
            return user;
        }catch(error){
            console.error("Error signing in with google:", error);
            setError("Error signing in with google, please try again");
            alert("Error signing in with google: " + error.message);
        }
    }
  return (
     <AuthContext.Provider value={{ currentUser, logIn, signUp, logOut, forgotPassword, googleSignIn, error}}>
        {!loading && children}
     </AuthContext.Provider>
  )
}

export const useAuth = () => {
    return useContext(AuthContext);
}

export default AuthProvider;