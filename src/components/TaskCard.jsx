import React from 'react';
import { useNavigate } from 'react-router-dom';

// task card to be shown on the home screen
const TaskCard = ({task}) => {

    const navigate = useNavigate();

    const handleCardClick = () => {
        navigate(`/task/${task.id}`)
    }
  return (
    <article onClick={handleCardClick} className='pl-3 py-4 bg-amber-800 flex-none'>
        <h4>{task.title}</h4>
        <div className="flex justify-bewteen">
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