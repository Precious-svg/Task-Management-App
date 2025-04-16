import React from 'react'
import TaskCard from './TaskCard'
import { useTasks } from "../Context/TaskContext"


// list of home screen task cards

const TasksList = ({seeAllTasks = true, layout="col"}) => {
  const {tasks} = useTasks()
  const taskToDisplay = seeAllTasks ? tasks : tasks.slice(0, 3);
  return (
    <div className={`flex ${layout === "row" ? "flex-nowrap overflow-x-auto" : "flex-col"} items-stretch justify-between px-4 py-5 md:py-8 gap-4`}>
      {taskToDisplay.map((task) =>(
         <TaskCard key={task.id} task={task}/>
      ))}
   </div>
  )
}

export default TasksList