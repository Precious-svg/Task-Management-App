import React from 'react'


const Welcome = () => {
  return (
    <div className='text-center flex flex-col justify-evenly items-center bg-cyan-800 h-screen'>
        <h4 className='pt-12 px-4 border-2 border-white basis-2/4 font-semibold text-2xl text-center text-white'>Hi There!!, Welcome to your Task Manager</h4>
        <div className="border-2 border-white mx-auto basis-1/4 place-content-center pb-4">
            <a href="#createAccount" className='self-center'>Create an Account</a>
            <div className='line-breaker'>or</div>
            <p>Sign up with your email</p>
        </div>
        <footer className="p-4 border-2 border-white mx-auto">Already have an account? <a href="#logIn">Log in here.</a></footer>
    </div>
  )
}

export default Welcome