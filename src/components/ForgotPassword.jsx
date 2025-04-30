import React from 'react';
import { useAuth } from '../Context/AuthContext';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';


const ForgotPassword = () => {
    const {forgotPassword, error} = useAuth();
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    

    const handleReset = async (e) => {
        e.preventDefault();

        if(!email){
            alert("Please enter your email");
            return;
        }
        try {
            await forgotPassword(email);
            setMessage("Password reset link sent to your email. Check your inbox!!")
        }catch(error){
            console.error("error sending link to reset password:", error)
        }

    }
  return (
    <div className="mx-auto">
        <h2 className="p-4">Enter your email below to reset your password: </h2>
        <form onSubmit={handleReset} className="flex w-full flex-col gap-6 justify-center items-center px-4 pt-8">
            <input name="email" id="email" value={email} placeholder="enter your email"className="bg-gray-200 p-4 w-full rounded-lg" 
             onChange={(e) => setEmail(e.target.value)}/>
            <button type="submit" className="bg-indigo-600 py-3 rounded-lg text-white text-base w-full">Send reset link</button>
        </form>
        <p className="p-4">{message}. Go to <NavLink to="/logIn">Log in.</NavLink></p>

    </div>
  )
}

export default ForgotPassword