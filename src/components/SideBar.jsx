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
      <li key={item.id} onClick={handleClick}>
        <div>{item.icon}</div>
        {item.name}
      </li>
    </>
  )
}

export default SideBar