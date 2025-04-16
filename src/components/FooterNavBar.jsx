import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';
import { FaCalendarAlt } from 'react-icons/fa';
import { FaPlus } from 'react-icons/fa';
import { FaTrashCan } from 'react-icons/fa6';
import { FaUserLarge } from 'react-icons/fa6';

const FooterNavBar = () => {
  return (
    <footer className=" w-screen fixed bottom-0 left-0 bg-gray-700 z-2">
        <nav className="flex flex-row items-center justify-between p-4 w-[100%]">
           <NavLink to="/"><FaHome size={30}/></NavLink>
           <NavLink to=""><FaCalendarAlt size={30}/></NavLink>
           <NavLink to="/newTaskForm"><FaPlus size={30} /></NavLink>
           <a href=""><FaUserLarge size={30} /></a>
           <a href=""><FaTrashCan size={30}/></a>
          </nav>
    </footer>
  )
}

export default FooterNavBar