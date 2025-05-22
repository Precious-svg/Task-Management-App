import React from 'react';
import { useTasks } from '../Context/TaskContext';
import {useState, useEffect} from "react";
import {doc, getDoc} from "firebase/firestore";
import { db } from '../services/firebase';

import { FaRegTrashCan } from 'react-icons/fa6';

const DeleteSubtask = ({taskId, subtaskId, subtask, onSubtaskDelete}) => {
    const {deleteSubtask} = useTasks();
    const [deletedSubtask, setDeletedSubtask] = useState(null);
    const [task, setTask] = useState(); 
    const [showButtons, setShowButtons] = useState();
    const [isDeleting, setIsDeleting] = useState(false)
 
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
    <>
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
       
    </>
  )
}

export default DeleteSubtask