import React from 'react';
import {useTasks} from "../Context/TaskContext";
import { useState, useEffect } from "react"
import { FaRegTrashCan } from 'react-icons/fa6';
import { doc, getDoc} from "firebase/firestore";
import { db } from '../services/firebase';

const Subtask = ({taskId, subtask, setIsEditing,}) => {
    const {toggleSubtaskStatus} = useTasks();
    const [isChecked, setIsChecked] = useState(subtask.status === "completed")
    const [loading, setLoading] = useState(true)
    const subtaskId = subtask.id;
   
    //delete functions
    const {deleteSubtask} = useTasks();
    const [deletedSubtask, setDeletedSubtask] = useState(null);
    const [task, setTask] = useState(); 
    const [showButtons, setShowButtons] = useState();
    const [isDeleting, setIsDeleting] = useState(false)
   

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

    // for delet subtask button
    useEffect(() => {
      const  fetchTask = async() => {
          try{
              const docRef = doc(db, "tasks", taskId);
              const docSnap = await getDoc(docRef);
              if(docSnap.exists()){
                  setTask({id: docSnap.id, ...docSnap.data()})
              } else{
                  console.log("Error, task not found")
              }
          } catch(error){
              console.error("Error fetching task:", error)
          } finally{
              setLoading(false)
          }
      }
      fetchTask();
  }, [taskId])

  const handleDeleteButton = () => {
    setIsDeleting(true);
    setShowButtons(true);
    setDeletedSubtask(subtask)
   
  }
 const handleContinueToDelete = async() => {
     if(!task || !task.subtasks) return;
     const subtasksData = task.subtasks;
     const remainingSubtasks = subtasksData.filter((sub) => sub.id !== subtaskId);

     try {
         await deleteSubtask(taskId, subtaskId);
         if(onSubtaskDelete) onSubtaskDelete(remainingSubtasks);
         setTask((prev) => ({ ...prev, subtasks: remainingSubtasks }));
         setIsDeleting(false);
         setShowButtons(false)
      } catch(error){
        console.error("Error deleting task:", error)
      }
    
  }

  const handleCancel = () =>{
    setIsDeleting(false);
    setDeletedSubtask(null);
    setShowButtons(false);
    
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
           <button onClick={handleDeleteButton}><FaRegTrashCan size={15}/></button>

           {isDeleting &&
          ( <div>
               {showButtons && 
                  <div>
                      <button onClick={handleCancel}>Cancel</button>
                      <button onClick={handleContinueToDelete}>Continue</button>
                  </div>
               }
               
           </div>)
        }
         </div>
         {/* <textarea id="comments" name="comments"  value="add a comment..."></textarea> */}
    </div>
  )
}

export default Subtask