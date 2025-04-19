import React from 'react'
import { useTasks } from '../Context/TaskContext';
import Subtask from "./Subtask"
import AddSubtaskForm from './AddSubtaskForm';
import { useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { FaBell } from 'react-icons/fa6';
import { FaEllipsisV } from 'react-icons/fa';
import { FaClockRotateLeft } from 'react-icons/fa6';
import { FaPlus } from 'react-icons/fa6';

// full description  and details of the task created
const FullTaskCard = ({taskId}) => {
    const {tasks, updateTaskStatus, removeTask} = useTasks();
   
    const task = tasks.find((t) => t.id === parseInt(taskId));
   if (!task) return <div>Task not found</div>;
    const subtasksLength = task.subtasks?.length || 0;


    const [showForm, setShowForm] = useState(false);
    const handleButtonClick = () => {
       setShowForm((prevState) => !prevState)
    }
    if(!task) return <div>Task not found</div>
  return (
    <div className='bg-gray-100 w-full min-h-screen flex flex-col px-7'>
        
          <header className='w-full py-7'>
                <nav className="flex gap-3 items-center justify-between">
                    <FaArrowLeft/>
                    <div className='flex gap-4'>
                        <FaBell/>
                        <FaEllipsisV/>
                    </div>
                </nav>
          </header>

     
           <main>
                <h2 className='font-bold text-2xl py-2'>{task.title}</h2>
                <section>
                    <h3 className='font-semibold text-xl my-2'>Details:</h3>
                    <p className='text-lg text-wrap my-3 py-4'>{task.details}.</p>
                    <div className='flex '>
                        <div className='flex bg-gray-400 gap-2 py-2 rounded-sm items-center'>
                            <FaClockRotateLeft size={20}/>
                            <span className='align-middle'>Due: {task.due_date}</span>
                      </div>
                        
                        <div>
                            <div></div>
                       </div> 
                    </div>
                </section>
                <section className="all-subtasks-container py-6">
                   {subtasksLength >= 0 ? (task.subtasks.map((subtask) =>(
                        <div className='mx-auto'>
                            <Subtask key={subtask.id} taskId={task.id} subtask={subtask}/>
                            <button onClick={handleButtonClick} className='px-6 py-3 w-full text-center rounded-lg border-dotted border-2 border-black  bg-gray-300'>
                              <span className='mx-auto align-center'>
                                  <FaPlus size={20}/>
                             </span>
                                {showForm &&  <AddSubtaskForm  taskId={task.id}/>}
                            </button>
                        </div>
                    ))) : (<button onClick={handleButtonClick}><FaPlus size={20}/></button>)}
                
                </section>
         </main>
    
 </div>
  )
}

export default FullTaskCard