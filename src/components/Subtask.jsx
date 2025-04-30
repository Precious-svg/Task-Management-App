import React from 'react';
import {useTasks} from "../Context/TaskContext";
import { useState } from "react"

const Subtask = ({taskId, subtask}) => {
    const {toggleSubtaskStatus} = useTasks();
    const [isChecked, setIsChecked] = useState(subtask.status === "completed")
   

    // const handleChange = (e) => {
    //     const {name, value} = e.target;
    //     if(name ===  "status"){
    //         setChangeStatus(value)
    //     }
    // }
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
    <div className="flex border-2 border-black gap-2 justify-between p-4 rounded-md">
         <div>
           <h3>{subtask.title}</h3>
           <p>{subtask.details}</p>
         </div>
         <input type="checkbox" checked={isChecked} name="status" id="markAsCompleted"  onChange={handleCheckBoxChange}/>
         {/* <textarea id="comments" name="comments"  value="add a comment..."></textarea> */}
    </div>
  )
}

export default Subtask