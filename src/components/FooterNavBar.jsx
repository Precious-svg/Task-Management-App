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
    <footer className=" w-screen fixed bottom-0 left-0 bg-gray-700 z-2 h-17">
        <nav className="flex flex-row items-center justify-between p-4 w-full md:max-w-[70%] lg:max-w-[60%] md:mx-auto">
           <NavLink to="/"><FaHome size={25}/></NavLink>
           <button onClick={goToCalendar}><FaCalendarAlt size={25}/></button>
           <NavLink to="/newTaskForm"><FaPlus size={25}/></NavLink>
           <a href=""><FaUserLarge size={25} /></a>
           <a href=""><FaTrashCan size={25}/></a>
          </nav>
    </footer>
  )
}

export default FooterNavBar