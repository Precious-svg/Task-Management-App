import React from 'react';
import { Link } from "react-router-dom";
import { FaExclamationTriangle } from 'react-icons/fa';
const NotFoundPage = () => {
  return (
    <div>
        <FaExclamationTriangle className=" bg-yellow-500 fa-4x mb-4"/>
        <h1 ClassName="text-6xl mb-4 font-bold">404 NOT FOUND</h1>
        <p className="text-xl mb-5">This page does not exist</p>
        <Link to="/" className='text-white bg-indigo-700 hoover:bg-indigo-900 px-3 py-2 mt-3'>Go home</Link>
    </div>
  )
}

export default NotFoundPage