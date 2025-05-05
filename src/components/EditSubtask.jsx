import React from 'react';
import { useTasks } from '../Context/TaskContext';
import { useState} from "react";
import Subtask from './Subtask';
const EditSubtask = ({subtask, taskId, onSubtaskUpdate}) => {
    const {updateSubtask, toggleSubtaskStatus} = useTasks();

    const [isEditing, setIsEditing] = useState(false);
    
    const [isChecked, setIsChecked] = useState(subtask.status === "completed");
    const [editedSubtask, setEditedSubtask] = useState({...subtask});

    const handleCheckBoxChange = async (e) => {
        const newStatus = e.target.checked ? "completed" : "pending"
        console.log(subtask)
       setIsChecked(e.target.checked)
       try{
        await toggleSubtaskStatus(taskId, subtask.id, newStatus);
       
        setEditedSubtask((prev) => ({...prev, status: newStatus}));
        console.log(subtask);
       } catch(error){
        console.error("Unable to change status")
       }
       
    }
   const handleChange = (e) => {
        setEditedSubtask({
            ...editedSubtask, [e.target.name]: e.target.value
        })
    };

    const handleSave = async() => {
        if(!editedSubtask.title || !editedSubtask.details){
            console.error("title and details are required");
            return;
        }
        console.log("save clicked");
        try {
            await updateSubtask(taskId, editedSubtask.id, editedSubtask);
            console.log("updating with:", editedSubtask)
            onSubtaskUpdate(editedSubtask);
            setIsEditing(false);
        } catch(error){
            console.error("Error saving edited subtask:", error)
        }
   };

    const handleCancel = () =>{
        setIsEditing(false);
        setEditedSubtask(subtask);
        setIsChecked(subtask.status === "completed")
    }

  return (
     <div>
         {isEditing ? (
              <div className="flex flex-col border-2 border-black gap-2 justify-around py-3 px-4 rounded-md">
                    <div className='flex gap-2 justify-between'>
                       <label htmlFor={`subtask-title-${subtask.id}`} className='py-4'>Title</label>
                       <input type="text" id={`subtask-title-${subtask.id}`} name="title" value={editedSubtask.title} onChange={handleChange} placeholder='Web optimization' required
                          className="bg-white p-2" />
                       <label htmlFor={`subtask-details-${subtask.id}`} id={`subtask-details-${subtask.id}`} className='py-4'>Description</label>
                       <textarea name="details" value={editedSubtask.details} onChange={handleChange} placeholder='Write something...'
                         className='bg-white py-3  px-2 rounded-md'>
                      </textarea>
   
                      <label htmlFor={`status-${subtask.id}`}><input type="checkbox" checked={isChecked} name="status" id={`status-${subtask.id}`} onChange={handleCheckBoxChange}/>Mark as completed</label>
                   </div>
   
                   <div className='flex justify-between items-center'>
                      <button onClick={handleSave}>Save</button>
                      <button onClick={handleCancel}>Cancel</button>
                  </div>
             </div>
             ) : (<Subtask subtask={editedSubtask} taskId={taskId} setIsEditing={setIsEditing} onSubtaskUpdate={onSubtaskUpdate}/>)
            } 
      </div>
   )
}

export default EditSubtask