import React from 'react'
import { NavLink } from 'react-router-dom';
import {useAuth} from "../Context/AuthContext";
import {useState} from "react";
import { useNavigate } from 'react-router-dom';

const CreateAccount = () => {
    const {signUp, googleSignIn, error} = useAuth();
    const navigate = useNavigate();
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleChange = (e) =>{
       const  {name, value} = e.target;
       if(name === "bothNames"){
        setFullName(value);
       } else if(name === "email"){
        setEmail(value)
       } else if (name === "pswrd"){
        setPassword(value)
       } else if(name === "confirmpswrd"){
        setConfirmPassword(value)
       }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if(!fullName || !email) {
            alert("Please enter your fullname and email");
            return;
        }
        if (password != confirmPassword) {
            alert("Both passwords should match");
            return;
        }   
            
        await signUp(email, password, fullName);
        if(!error){
            navigate("/")

        };    
        
    }


    // sign in with google

    const handleGoogleSignIn = async (e) => {
        try {
            await googleSignIn();
            alert("Signed in successfully")
        }catch(error){
            alert("Failed to sign in")
        }
    }
  return (
    <div id="createAccount" className='bg-slate-50 w-[100%] h-full rounded-lg'>
        <header className=" flex justify-between px-7 py-6">
            <i className=''>B</i>
            <img src="" alt="cartton icon"/>
        </header>
        <main className="w-full px-7 pb-6">
            <form className='flex flex-col justify-around items-center w-full gap-6'>
                <input type="text" id="bothNames" name="bothNames"  value={fullName} placeholder='Enter your full name' required
                 className="bg-gray-200 p-4 w-full rounded-lg" onChange={handleChange}/>

                <input type="email" id="email" name='email' required value={email} placeholder='email@yourmail.com'
                 className="bg-gray-200 w-full p-4 rounded-lg" onChange={handleChange}/>

                <input type="password" id="pswrd" name="pswrd" value={password} placeholder='Enter password'required 
                className="bg-gray-200 p-4 w-full rounded-lg" onChange={handleChange}/>

                <input type="password" id="confirmPswrd" name="confirmpswrd" value={confirmPassword} placeholder='Confirm password' required
                 className="bg-gray-200 p-4 w-full rounded-lg" onChange={handleChange}/>

                <div required className="p-4 w-full">
                    <input type="checkbox" id="terms" name="terms" required/>
                    <label htmlFor="terms" className='px-2 align-baseline'><a href="">I agree to the terms and conditions.</a></label>
                </div>
                <button type="submit" className="bg-indigo-600 py-3 rounded-lg text-white text-base w-full" onClick={handleSubmit}>Sign up</button>
            </form>
        </main>

        <footer className='w-full px-7 flex-col items-center justify-around' >
            <div className='flex justify-between items-center w-full pb-4'>
                <span className='border-t-[2px] w-[33%] border-t-gray-200'></span>
                <p className=''>Sign up with</p>
                <span  className='border-t-[2px] w-[33%] border-t-gray-200'></span>
            </div>
            <ul className='flex justify-around items-center pb-3'>
                <li><button onClick={handleGoogleSignIn}><img src="" alt="gmail icon"/></button></li>
                <li><img src="" alt="apple icon"/></li>
            </ul>
            <p className='text-center pb-3'>Already have an account? <NavLink to="/logIn">Sign in.</NavLink></p>
        </footer>
    </div>
  )
}

export default CreateAccount