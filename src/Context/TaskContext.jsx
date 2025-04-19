import React from 'react';
import { collection, onSnapshot, addDoc, deleteDoc, updateDoc, doc, query, where} from "firebase/firestore";
import { db } from '../services/firebase';
import {createContext, useState, useEffect, useContext} from "react"; 
import { useAuth } from "./AuthContext"
// import taskDetails from "../taskDetails.json"


const TaskContext = createContext();
const TaskProvider = ({children}) => {
    const { currentUser } = useAuth();
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if(!currentUser) return; //wait until user is authenticated
        const q = query(collection(db, "tasks"), where("userId", "==", currentUser.uid));


        const unsubscribe = onSnapshot(q, (snapshot) => {
            const fetchedTasks = snapshot.docs.map(doc => ({
                id: doc.id, ...doc.data()
            }));
            setTasks(fetchedTasks);
        });
        return () => unsubscribe();
    }, [currentUser]); //You convert the snapshot into a nice array of task objects with their id and data, then store it in tasks.
    
    const addTask = async (newTask) => {
        if(!currentUser) return;
        try{
            await addDoc(collection(db, "tasks"), {
                ...newTask, 
                userId: currentUser.uid,
                created_at: Date.now
            });
        } catch(error){
            console.error("Error adding task:", error)
        }
    }
    
   

    const removeTask = async(taskId) => {
        try{
            await deleteDoc(doc(db, "tasks", taskId))
        } catch(error){
            console.error("Error deleting file:", error)
        }
    }

    const updateTask = async(taskId, updatedData) => {
       
        try{
            const taskRef = doc(db, "tasks", taskId);
            await updateDoc(taskRef, updatedData);
        }catch(error){
            console.error("Error updating task data:", error)
        }
    }



    // to update the subtask stautus

    const toggleSubtaskStatus = (taskId, subtaskId, newStatus) =>{
        setTasks((prevTasks) => {
            return prevTasks.map((task) => {
                if (task.id !== taskId) return task;

                const updatedSubtasks = task.subtasks.map((subtask) => {
                   if(subtask.id !== subtaskId) return subtask;
                    
                    return {
                        ...subtask, status: newStatus}
                });
                const updatedTaskStatus = getTaskStatus(updatedSubtasks);
                
               return  {
                    ...task, 
                    subtasks: updatedSubtasks,
                    status: updatedTaskStatus
                }
                
            });
        });
    };
    // to update the task Status
    const getTaskStatus = (subtasks) => {
        if(!Array.isArray(subtasks)) return "pending"
        const totalSubtasks = subtasks.length;
        const completedSubtasks  = subtasks.filter((subtask) => subtask.status === "completed").length;

        if(completedSubtasks === 0) return "pending"
        if(totalSubtasks === completedSubtasks) return "completed"
        return "in progress"
        console.log (tasks)
    }

    // functions for adding, removing and editind subtasks

    const addNewSubtasks = async(newSubtask, taskId) => {
        const taskRef = doc(db, "tasks", taskId);
        const taskSnap = await getDoc(doc);
        if (taskSnap.exists()){
            const taskData = taskSnap.data();
            const updatedSubtasks = [
                ...(taskData.subtasks || []),
                {
                    ...newSubtask,
                    id: uuidv4(),
                    status: "pending"
                }
            ];
            await updateDoc(taskRef, {
                subtasks: updatedSubtasks
            });

        } 
    };

    const deleteSubtask = async(subtaskId, taskId) => {
        const taskRef = doc(db, "tasks", taskId);
       const  taskSnap = await getDoc(doc);
       if(taskSnap.exists()){
        const taskData = taskSnap.data()
        const taskSubtasks = taskData.subtasks;
        const filteredSubtasks = taskSubtasks.filter((taskSubtask) => (taskSubtask.id !== subtaskId));
        const updatedSubtasks = {
            ...taskData,
            subtasks: filteredSubtasks
        };

        await updateDoc(taskRef, {
            subtasks: updatedSubtasks
        });
        
       }
    }

    // const deleteSubtask = (subtaskId, taskId) => {
    //     setTasks((prevTasks) =>
    //         prevTasks.map((task) => {
    //             if(task.id === taskId){
    //                 const filteredSubtasks = task.subtasks.filter((subtask) => (subtask.id !== subtaskId))
    //                 return {...task, subtasks: filteredSubtasks}
    //             }  
    //          return task;
    //         })
    //     );
    // };

  return (
    <TaskContext.Provider value={{tasks, addTask, removeTask, updateDoc, toggleSubtaskStatus, getTaskStatus, addNewSubtasks, deleteSubtask}}>
        {children}
   </TaskContext.Provider>
  )
}


export const useTasks = () => {
    return useContext(TaskContext);
}

export default TaskProvider;