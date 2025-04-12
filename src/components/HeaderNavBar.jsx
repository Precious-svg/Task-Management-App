import React from 'react';
import { useState } from "react";
import { sideBarItems } from '../SideBarItems';
import SideBar from './SideBar';

const HeaderNavBar = () => {
    const [openSideBar, setOpenSideBar] = useState(false);
    const toggleSideBar = () => {
        setOpenSideBar((prevState) => !prevState)
    }
  return (
   <header className="flex w-full border-2 border-black justify-between items-center px-4 py-5" >
       <button onClick={toggleSideBar} className={`h-6 w-[14px]  cursor-pointer z-50 ${openSideBar && 'top-0 pt-0 pb-4 mb-3'}`}>{openSideBar ? "x" : "="}</button>
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
       <img src="" alt="logged-in user profile pic"/>
   </header> 
  )
}

export default HeaderNavBar