import React from 'react'
import { signUpWithEmail, signInWithEmail, signOutUser, onAuthStateChangedListener } from "../services/firebaseAuth"
import { createContext, useState, useEffect, useContext} from "react"

const AuthContext = createContext()

const AuthProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(null)
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsub = onAuthStateChangedListener((user) => {
            setCurrentUser(user);
            setLoading(false);
        });
        return () => unsub();
    }, [])

    const logIn = (email, password) => signInWithEmail(email, password);
    const signUp = (email, password) => signUpWithEmail(email, password);
    const logOut = () => signOutUser()
  return (
     <AuthContext.Provider value={{ currentUser, logIn, signUp, logOut }}>
        {!loading && children}
     </AuthContext.Provider>
  )
}

export const useAuth = () => {
    return useContext(AuthContext);
}

export default AuthProvider;