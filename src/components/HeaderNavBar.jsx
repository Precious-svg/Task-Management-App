import React from 'react';
import { useState } from "react";
import { sideBarItems } from "../sideBarItems";
import SideBar from './SideBar';
import { FaRegWindowClose } from 'react-icons/fa';
import { FaBars } from 'react-icons/fa6';

const HeaderNavBar = () => {
    const [openSideBar, setOpenSideBar] = useState(false);
    const toggleSideBar = () => {
        setOpenSideBar((prevState) => !prevState)
    }
  return (
   <header className="w-screen fixed top-0 left-0  h-20 right-0 px-4 py-4" >
       <div className='flex justify-between items-center w-full md:max-w-[70%] lg:max-w-[60%] md:mx-auto px-4 py-4' >
           <button onClick={toggleSideBar} className={`h-6 w-[14px]  cursor-pointer z-50 ${openSideBar && 'top-0 pt-0 pb-4 mb-3'}`}>{openSideBar ? <FaRegWindowClose size={30}/> : <FaBars size={25}/>}</button>
           <aside className={`sideBar h-screen bg-red-300 text-black fixed top-0 flex flex-col left-0 pt-15 px-10 w-[72] ${openSideBar ? "translate-x-0" : "-translate-x-full"}`}>
             {openSideBar &&
             <nav className='pt-4'>
                <ul className='flex flex-col items-center justify-evenly gap-4'>
                    {sideBarItems.map((item) =>(
                        <SideBar key={item.id} item={item} className="py-4"/>
                    ))}
                </ul>
             </nav>}
           </aside>
           <img src="" alt="user-pic"/>
       </div>
   </header> 
  )
}

export default HeaderNavBar