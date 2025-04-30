import React from 'react'
import TaskCard from './TaskCard'
import { useTasks } from "../Context/TaskContext"


// list of home screen task cards

const TasksList = ({seeAllTasks = true, layout="col", variant}) => {
  const {tasks} = useTasks()
  const taskToDisplay = seeAllTasks ? tasks : tasks.slice(0, 3);
  return (
    <div className={`flex ${layout === "row" ? "flex-nowrap overflow-x-auto items-stretch " : "flex-col items-center flex-nowrap overflow-y-auto "} justify-center  px-4 py-5  md:py-8 gap-4 w-full`}>
      {taskToDisplay.map((task) =>(
         <TaskCard key={task.id} task={task} variant={variant}/>
      ))}
   </div>
  )
}

export default TasksList