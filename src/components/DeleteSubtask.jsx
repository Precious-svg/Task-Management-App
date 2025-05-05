import React from 'react';
import { useTasks } from '../Context/TaskContext';
import Subtask from './Subtask';
import {useState, useEffect} from "react";
import {doc, getDoc} from "firebase/firestore";
import { db } from '../services/firebase';
import Subtask from './Subtask';
const DeleteSubtask = ({taskId, subtaskId, subtasks, subtask}) => {
    const {deleteSubtask} = useTasks();
    const [deletedSubtask, setDeletedSubtask] = useState(null);
    const [undeletedSubtasks, setUndeletedSubtasks] = useState([...subtasks])
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
        isDeleting &&  setShowButtons(true);
       
    }
    const handleContinueToDelete = async() => {
        const subtasksData = task.subtasks
        if(taskId === task.id){
            const remainingSubtasks = subtasksData.filter((sub) => sub.id !== subtaskId);
            const actualSubtask = subtasksData.find((sub) => sub.id === subtaskId );
            setTask((prev) => ({...prev, subtasks: remainingSubtasks}))
            setDeletedSubtask([...actualSubtask]);
            setUndeletedSubtasks([...remainingSubtasks])
            setIsDeleting(false);
            setShowButtons(false)
            try{
                await deleteSubtask(taskId, subtaskId);
                onSubtaskDelete(remainingSubtasks);
            } catch(error){
                console.error("Error deleting task:", error)
            }
        } else{
            console.log("Unable to delete task, try again");
        }
    }


    const handleCancel = () =>{
        setIsDeleting(false);
        setDeletedSubtask(null);
        setUndeletedSubtasks(subtasks);
        setShowButtons(false);
        
    }
  return (
    <div>&
        {isDeleting ?
          ( <div>
               <Subtask subtask={deletedSubtask} taskId={taskId} setIsEditing={() => setIsEditing(false)}/>
               {showButtons && 
                  <div>
                      <button onClick={handleCancel}>Cancel</button>
                      <button onClick={handleContinueToDelete}>Continue</button>
                  </div>
               }
               
           </div>) : (<Subtask/>)
        }
       
    </div>
  )
}

export default DeleteSubtask