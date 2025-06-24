import React from 'react'
import TaskCard from './TaskCard';
import Loader from './Loader';
import { useState } from "react"
import NavBar from './NavBar';

import { useTasks } from "../Context/TaskContext"

const FilteredTask = ({status}) => {
    const {tasks, loading} = useTasks()
    
    if (loading) return <Loader/>;
    const tasksToBeDisplayed = tasks.filter((task) => (task.status === status))
  
  return (
    <div className={ "flex flex-col items-center flex-nowrap overflow-y-auto  justify-center  px-4 py-5  md:py-8 gap-4 w-full"}>
        <NavBar/>
      {tasksToBeDisplayed.map((task) =>(
         <TaskCard key={task.id} task={task} />
      ))}
   </div>
  )
}

export default FilteredTask