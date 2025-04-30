import React from 'react';
import { useNavigate } from 'react-router-dom';

// task card to be shown on the home screen
const TaskCard = ({task, variant}) => {

    const navigate = useNavigate();

    const handleCardClick = () => {
        navigate(`/task/${task.id}`)
    }
  return (
    <article onClick={handleCardClick} className={`${variant === "home" ? "min-w-0 max-w-[65%]" : "w-[80%] h-auto"} flex flex-col items-center justify-evenly gap-2 px-4 py-4 bg-amber-800 rounded-xl flex-1  lg:max-w-[70%]`}>
        <h4 className='text-center'>{task.title}</h4>
        <div className="flex justify-between">
          <span>{task.subtasks.length} Tasks</span>
          <div className="outerSpinner">
              <div className='innerSpinner'></div>
           </div>
       </div>
        
        <nav>
          <a href="" alt="to do icon"></a>
           <p>To-do</p>
        </nav>
    </article>
  )
}

export default TaskCard