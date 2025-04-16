import React from 'react';
import { useState } from "react";
import { sideBarItems } from '../SideBarItems';
import { FaBars } from 'react-icons/fa6';
import SideBar from './SideBar';

const HeaderNavBar = () => {
    const [openSideBar, setOpenSideBar] = useState(false);
    const toggleSideBar = () => {
        setOpenSideBar((prevState) => !prevState)
    }
  return (
   <header className="flex w-full justify-between items-center fixed top-0 left-0   h-10 right-0 px-4 py-4" >
       <button onClick={toggleSideBar} className={`h-6 w-[14px]  cursor-pointer z-50 ${openSideBar && 'top-0 pt-0 pb-4 mb-3'}`}>{openSideBar ? "x" : <FaBars/>}</button>
       <aside className={`sideBar h-screen bg-red-300 text-black absolute top-0 flex flex-col item left-0 w-[72]${openSideBar ? "translate-x-0" : "-translate-x-full"}`}>
         {openSideBar &&
         <nav>
            <ul>
                {sideBarItems.map((item) =>(
                    <SideBar key={item.id} item={item}/>
                ))}
            </ul>
         </nav>}
       </aside>
       <img src="" alt="user-pic"/>
   </header> 
  )
}

export default HeaderNavBar