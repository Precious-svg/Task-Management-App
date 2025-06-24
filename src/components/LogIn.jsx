import React from 'react';
import {useAuth} from "../Context/AuthContext"
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { SiGmail, SiApple } from "react-icons/si";

const LogIn = () => {

    const { logIn, error, googleSignIn } = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const [msg, setMsg] = useState("");


   const handleLogIn = async (e) => {
        e.preventDefault();
        
        console.log("Attempting to log in with:", email, password);
        if(!email || !password){
            console.log("please enter email and password");
            setMsg("please enter email and password")
            return;
        }

        try {
            await logIn(email, password);
            navigate("/")
        }catch(error){
            setMsg(error.message)
        }
    };
    let signingIn = false;
    const handleGoogleSignIn = async (e) => {
        if (signingIn) return; // Prevent multiple popups
         signingIn = true;
        try {
           const user = await googleSignIn();
           alert("Signed in successfully: " + user.displayName);
        }catch(error){
            alert("Failed to sign in:" + error.message)
        }finally {
            signingIn = false;
          }
    }
  return (
    <section className='bg-slate-50 w-[100%] h-full rounded-lg flex items-center justify-center md:w-[70%] md:mx-auto md:place-self-center'>
       
        <div id="logIn" className="w-full px-7 pb-7  md:mx-auto lg:place-self-center lg:mx-auto">
           <div>
                 <h2 className='text-3xl font-bold pt-6 pb-3'>Log In</h2>
                 <p className="py-4">Complete the form below to sign in to your account.</p>
            </div>
            <form className='flex flex-col justify-around items-center w-full gap-6'>
                <input type="email" id="email" name="userEmail" placeholder="Email" value={email} onChange={(e) =>setEmail(e.target.value) }
                 className="bg-gray-200 p-4 w-full rounded-lg"/>
                 
                <input type="password" id="pswrd" name="userPswrd" placeholder="*******"  value={password} onChange={(e) => setPassword(e.target.value)}
                 className="bg-gray-200 p-4 w-full rounded-lg"/>
                 {error && <p>{error}</p>}

                <div className='flex justify-between items-start w-full  pt-2 pb-4'>
                    <div className='p'>
                        <input type="checkbox" id="rememberUser" name="rememberUser" className="pr-2 mx-r-2"/>
                        <label htmlFor="rememberUser" className="pl-2 align-middle">Remember me</label>
                    </div>
                    <NavLink to="/forgotPassword">Forgot password?</NavLink>
                </div>

                <button type="submit" className='place-self-center w-full py-4 rounded-lg bg-indigo-600' onClick={handleLogIn}>Log in</button>
                {error && <p className='text-red-400 text-[14px] mt-3'>{error}</p>}
                <p className='text-red-400 text-[14px] mt-3'>{msg}</p>

            </form>
            <footer className='w-[100%] flex-col items-center justify-around' >
            <div className='flex justify-between items-center w-full py-6'>
                <span className='border-t-[2px] w-[33%] border-t-gray-200'></span>
                <p className=''>Sign in with</p>
                <span  className='border-t-[2px] w-[33%] border-t-gray-200'></span>
            </div>
            <ul className='flex justify-around items-center pb-2'>
                <li><button onClick={handleGoogleSignIn}><SiGmail size={40} color="#D44638"/></button></li>
                <li><SiApple size={40} color="#000000"/></li>
            </ul>
        </footer>
        </div>
    </section>
  )
}

export default LogIn