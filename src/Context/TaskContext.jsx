import React from 'react';
import { collection, onSnapshot, addDoc, deleteDoc, updateDoc, doc, query, where} from "firebase/firestore";
import { db } from '../services/firebase';
import { getDoc } from "firebase/firestore";
import {createContext, useState, useEffect, useContext} from "react"; 
import { useAuth } from "./AuthContext";
import { v4 as uuidv4 } from 'uuid'; 
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
            setLoading(false);
        }, (error) => {
            console.error("Error fetching tasks:", error);
            setLoading(false)
        });
        return () => unsubscribe();
    }, [currentUser]); //You convert the snapshot into a nice array of task objects with their id and data, then store it in tasks.
    
    const addTask = async (newTask) => {
        if(!currentUser){
            console.warn("No currentUser found, not adding task.");
            return;
        };
        try{
           const docRef = await addDoc(collection(db, "tasks"), {
                ...newTask, 
                userId: currentUser.uid,
                created_at: Date.now()
            });
            console.log("Firebase docRef returned:", docRef);
            console.log("Task added with ID:", docRef.id);
            return docRef.id;
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

    const toggleSubtaskStatus = async (taskId, subtaskId, newStatus) => {
        try {const taskRef = doc(db, "tasks", taskId);
        const taskSnap = await getDoc(taskRef);
        if(taskSnap.exists()){
            const taskData = taskSnap.data();
            const taskSubtasks = taskData.subtasks;
            const updatedSubtasks = taskSubtasks.map((subtask) =>{
                if(subtask.id !== subtaskId) return subtask;
                return{
                    ...subtask, status: newStatus
                };
            });
            const updatedTaskStatus = getTaskStatus(updatedSubtasks);
            await updateDoc(taskRef, {
                subtasks: updatedSubtasks,
                status: updatedTaskStatus
            });
            console.log("Subtask status updated successfully.")
        }else{
            console.error("Task not found")
        }} catch(error){
            console.error("unable to update subtask sttaus:", error);
            throw error
        }
    };
    // to update the task Status
    const getTaskStatus = (subtasks) => {
        if(!Array.isArray(subtasks)) return "pending"
        const totalSubtasks = subtasks.length;
        const completedSubtasks  = subtasks.filter((subtask) => subtask.status === "completed").length;

        if(completedSubtasks > 0) return "in progress"
        if(totalSubtasks === completedSubtasks) return "completed"
        return "pending"
    }

    // functions for adding, removing and editind subtasks

    const addNewSubtasks = async(newSubtask, taskId) => {
        const taskRef = doc(db, "tasks", taskId);
        const taskSnap = await getDoc(taskRef);
        if (taskSnap.exists()){
            const taskData = taskSnap.data();
            const subtaskdWithId = {
                ...newSubtask,
                id: uuidv4(),
                status: "pending"
            }
            const updatedSubtasks = [
                ...(taskData.subtasks || []),
                subtaskdWithId
            ];
            await updateDoc(taskRef, {
                subtasks: updatedSubtasks
            });

            return subtaskdWithId;
        } else {
            throw new Error("Task not found")
        }
    };

    const deleteSubtask = async(taskId, subtaskId) => {
        const taskRef = doc(db, "tasks", taskId);
       const  taskSnap = await getDoc(taskRef);
       if(taskSnap.exists()){
        const taskData = taskSnap.data();
        const taskSubtasks = taskData.subtasks || [];
        const filteredSubtasks = taskSubtasks.filter((subtask) => (subtask.id !== subtaskId));
        

        await updateDoc(taskRef, {
            subtasks: filteredSubtasks
        });
        
       };
    }

    const updateSubtask = async (taskId, subtaskId, updatedSubtaskData) => {
        const taskRef = doc(db, "tasks", taskId);
        const taskSnap = await getDoc(taskRef);
        if(!taskSnap.exists()) throw new Error("task not found");
        const taskData = taskSnap.data();
        const taskSubtasks = taskData.subtasks;
        if(!taskSubtasks || !Array.isArray(taskSubtasks)){
            throw new Error("No subtasks found")
        }
        const updateSubtasks = taskSubtasks.map((subtask) => {
         return  subtask.id === subtaskId ? {...subtask, ...updatedSubtaskData} : subtask
        });

       await updateDoc(taskRef, {
           subtasks: updateSubtasks
       });
        
    }
    

  return (
    <TaskContext.Provider value={{tasks, addTask, removeTask, updateTask, updateDoc, toggleSubtaskStatus, getTaskStatus, addNewSubtasks, deleteSubtask, updateSubtask}}>
        {children}
   </TaskContext.Provider>
  )
}


export const useTasks = () => {
    return useContext(TaskContext);
}

export default TaskProvider;