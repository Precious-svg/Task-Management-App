import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';
import { FaCalendarAlt } from 'react-icons/fa';
import { FaPlus } from 'react-icons/fa';
import { FaTrashCan } from 'react-icons/fa6';
import { FaUserLarge } from 'react-icons/fa6';


const FooterNavBar = () => {
  const navigate = useNavigate()
  const goToCalendar = () => {
    navigate('/calendar');
  };
  return (
    <footer className=" w-screen fixed bottom-0 left-0 bg-gray-700 z-2">
        <nav className="flex flex-row items-center justify-between p-4 w-[100%]">
           <NavLink to="/"><FaHome size={30}/></NavLink>
           <button onClick={() => goToCalendar}><FaCalendarAlt size={30}/></button>
           <NavLink to="/newTaskForm"><FaPlus size={30} /></NavLink>
           <a href=""><FaUserLarge size={30} /></a>
           <a href=""><FaTrashCan size={30}/></a>
          </nav>
    </footer>
  )
}

export default FooterNavBar