import React from 'react';
import { NavLink } from 'react-router-dom';

const FooterNavBar = () => {
  return (
    <footer className=" w-screen fixed bottom-0 left-0">
        <nav className="flex flex-row items-center justify-evenly p-4 w-[100%]">
           <NavLink to="/"><img src="" alt="home icon"/></NavLink>
           <NavLink to=""><img src="" alt="calender icon"/></NavLink>
           <a href=""><img src="" alt="plus icon"/></a>
           <a href=""><img src="" alt="bin icon"/></a>
           <a href=""><img src="" alt="profile icon"/></a>
          </nav>
    </footer>
  )
}

export default FooterNavBar