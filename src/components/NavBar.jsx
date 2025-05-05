import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { FaEllipsisV } from 'react-icons/fa';
import { FaRegWindowClose } from 'react-icons/fa';


const NavBar = ({pageOptions = []}) => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const toggleNavBar = () => {
        setIsOpen((prevState) => !prevState)
    }

    const handleBackClick = () => {
        console.log("Navigating back...")
        navigate(-1);
    }
  return (
    <>
        <nav className="flex gap-3 items-center justify-between w-[90%]">
          <button onClick={handleBackClick} className="text-xl"><FaArrowLeft/></button>
          <div className='flex gap-4'>
              <button onClick={toggleNavBar} className="text-black text-2xl z-100">{isOpen ? <FaRegWindowClose/> : <FaEllipsisV/>}</button>
              <aside className={`h-auto w-36 flex flex-col text-white bg-pink-200 rounded-md ${isOpen ? "translate-x-0" : "-translate-x-full"} absolute  top-10 right-[-3] z-50`}>
                {isOpen && pageOptions && pageOptions.map((option, index) => 
                   <div key={index} className="border-b border-white">
                    <button onClick={option.onClick} className="w-full text-left hover:bg-pink-300 py-4  pl-2">{option.label}</button>
                   </div>
                )}
              </aside>
          </div>
      </nav>
    </>
  )
}

export default NavBar