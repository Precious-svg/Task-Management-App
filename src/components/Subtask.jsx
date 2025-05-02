import React from 'react';
import {useTasks} from "../Context/TaskContext";
import { useState } from "react"
import { FaRegTrashCan } from 'react-icons/fa6';
const Subtask = ({taskId, subtask, setIsEditing}) => {
    const {toggleSubtaskStatus} = useTasks();
    const [isChecked, setIsChecked] = useState(subtask.status === "completed")
   

    const handleCheckBoxChange = async (e) => {
        const newStatus = e.target.checked ? "completed" : "pending"
        console.log(subtask)
       setIsChecked(e.target.checked)
       try{
        await toggleSubtaskStatus(taskId, subtask.id, newStatus);
        console.log(subtask)
       } catch(error){
        console.error("Unable to change status")
       }
       
    }

  return (
    <div className="flex flex-col border-2 border-black gap-2 justify-around py-3 px-4 rounded-md">
         <div className='flex gap-2 justify-between'>
           <div>
             <h3>{subtask.title}</h3>
             <p>{subtask.details}</p>
           </div>

           <input type="checkbox" checked={isChecked} name="status" id="markAsCompleted"  onChange={handleCheckBoxChange}/>
         </div>

         <div className='flex justify-between items-center'>
           <button onClick={() => setIsEditing(true)}>Edit</button>
           <button><FaRegTrashCan size={15}/></button>
         </div>
         {/* <textarea id="comments" name="comments"  value="add a comment..."></textarea> */}
    </div>
  )
}

export default Subtask