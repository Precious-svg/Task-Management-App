import React from 'react'
import HeaderNavBar from './HeaderNavBar';
import TasksList from './TasksList';
import { FaCheck } from 'react-icons/fa';
import { FaFileAlt } from 'react-icons/fa';
import { FaPen } from 'react-icons/fa6';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const HomeApp = () => {

   const [seeAllTasks, setSeeAllTasks] = useState(false);
   
  return (
    <body className='w-full'>
       <div className="flex relative flex-col gap-2 min-h-screen bg-gray-100 mx-auto w-full">
          <HeaderNavBar/>
          <main className="pb-5  pt-15 mt-4 md:w-[75%] md:h-[70%] flex-grow">
             <span className="py-2 pl-4">Good Morning, User</span>
             <p className="py-2 pl-4">You have <span className='text-[20px] font-bold text-green-500'>39 tasks </span>for this month</p>
             <section className='pt-4'>
                  <menu className="flex justify-around  gap-4 py-6 items-center px-2">
                      <nav className='flex-1'>
                          <div className="bg-pink-600 w-[50px]  place-self-center flex items-center justify-center h-[50px] rounded-[50%]">
                            <span className='text-middle align-middle'><FaPen /></span>
                          </div>
                         <p className='self-center text-center'>To-do</p>
                      </nav>
                      <nav className="flex-1">
                         <div className="bg-yellow-300 w-[50px] place-self-center flex items-center justify-center h-[50px] rounded-[50%]">
                            <span className='text-middle align-middle'><FaFileAlt /></span>
                         </div>
                         <p className='self-center text-center text-nowrap'>In Progress</p>
                      </nav>
                      <nav className="flex-1">
                          <div className="bg-green-500 w-[50px] place-self-center flex items-center justify-center h-[50px] rounded-[50%]">
                            <span className='text-middle align-middle'><FaCheck /></span>
                          </div>
                          <p className='self-center text-center'>Completed</p>
                      </nav>
                   </menu>
              </section>
              <section className='py-6'>
                 <div className='flex justify-between items-center px-4 py-6'>
                     <h3>Recent Tasks</h3>
                     <Link to="/seeAllTasks">See all</Link>
                 </div>
                 <TasksList seeAllTasks={seeAllTasks} layout="row" variant="home"/>
              </section>
          </main>
       </div>
    </body>
  )
}

export default HomeApp