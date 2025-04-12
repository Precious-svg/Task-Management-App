import React from 'react'
import HeaderNavBar from './HeaderNavBar';
import TasksList from './TasksList';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const HomeApp = () => {

   const [seeAllTasks, setSeeAllTasks] = useState(false);
   
  return (
    <div className="flex flex-col justify-evenly relative bg-gray-50">
       <HeaderNavBar/>
       <main className="py-5">
          <span className="py-2 pl-4">Good Morning, User</span>
          <p className="py-2 pl-4">You have 39 tasks for this month</p>
          <section className='pt-4'>
               <menu className="flex items-center justify-evenly py-6  px-2 border-2 border-black">
                   <nav>
                      <a href="" alt="to do icon"></a>
                      <p>To-do</p>
                   </nav>
                   <nav>
                      <a href="" alt="to do icon"></a>
                      <p>In Progress</p>
                   </nav>
                   <nav>
                       <a href="" alt="green file icon"></a>
                       <p>Completed</p>
                   </nav>
                </menu>
           </section>
           <section>
              <div className='flex justify-between items-center p-4'>
                  <h3>Recent Tasks</h3>
                  <Link to="/seeAllTasks">See all</Link>
              </div>
              <TasksList seeAllTasks={seeAllTasks} layout="row"/>
           </section>
       </main>   
    </div>
  )
}

export default HomeApp