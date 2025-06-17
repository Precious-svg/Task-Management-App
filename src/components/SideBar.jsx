import React from 'react'
import { Link } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';
import { useNavigate } from 'react-router-dom';


const SideBar = ({item}) => {
    const { logOut } = useAuth();
    const navigate = useNavigate();
    const handleClick = async () => {
        if(item.name.toLowerCase() === "log out"){
            await logOut();
            navigate("/logIn")
        } else{
            navigate(item.link)
        }
    }
  return (
    <>
      <li key={item.id} onClick={handleClick} className='flex gap-4 items-center justify-center'>
        <div className='h-8 w-8'>{item.icon}</div>
        <p className='text-lg'>{item.name}</p>
      </li>
    </>
  )
}

export default SideBar