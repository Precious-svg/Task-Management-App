import React from 'react'
import HeaderNavBar from './HeaderNavBar';
import TasksList from './TasksList';
import { FaCheck } from 'react-icons/fa';
import { FaFileAlt } from 'react-icons/fa';
import { FaPen } from 'react-icons/fa6';
import { useState } from 'react';
import { Link, NavLink, useNavigate} from 'react-router-dom';
import { useTasks } from '../Context/TaskContext';


const HomeApp = () => {
   const {tasks } = useTasks()
   const [seeAllTasks, setSeeAllTasks] = useState(false);
  


   
  return (
    <section className='w-full bg-gray-100 mx-auto min-h-screen flex flex-col justify-center items-center'>
       <div className="flex relative flex-col gap-2 min-h-screen bg-gray-100 w-full  md:place-self-center md:w-[70%] lg:w-[60%]">
          <HeaderNavBar/>
          <main className="pb-15  pt-20 mt-4 md:w-full flex-grow md:mx-auto">
             <span className="py-2 pl-4">Good Morning, User</span>
             <p className="py-2 pl-4">You have <span className='text-[20px] font-bold text-green-500'>{tasks.length} tasks </span>for this month</p>
             <section className='pt-4'>
                  <menu className="flex justify-around  gap-4 py-6 items-center px-2">
                      <NavLink to="/pending-tasks" className='flex-1'>
                          <div className="bg-pink-600 w-[50px]  place-self-center flex items-center justify-center h-[50px] rounded-[50%]  md:w-[70px] md:h-[70px]">
                            <span className='text-middle align-middle  w-6 h-6 md:w-8 md:h-8'><FaPen className='h-full w-full'/></span>
                          </div>
                         <p className='self-center text-center'>To-do</p>
                      </NavLink>
                      <NavLink to="/ongoing-tasks" className="flex-1">
                         <div className="bg-yellow-300 w-[50px] place-self-center flex items-center justify-center h-[50px] rounded-[50%] md:w-[70px] md:h-[70px]">
                            <span className='text-middle align-middle  w-6 h-6 md:w-8 md:h-8'><FaFileAlt className='h-full w-full'/></span>
                         </div>
                         <p className='self-center text-center text-nowrap'>In Progress</p>
                      </NavLink>
                      <NavLink to="/completed-tasks" className="flex-1">
                          <div className="bg-green-500 w-[50px] place-self-center flex items-center justify-center h-[50px] rounded-[50%]  md:w-[70px] md:h-[70px]">
                            <span className='text-middle align-middle w-6 h-6 md:w-8 md:h-8'><FaCheck className='h-full w-full' /></span>
                          </div>
                          <p className='self-center text-center'>Completed</p>
                      </NavLink>
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
    </section>
  )
}

export default HomeApp