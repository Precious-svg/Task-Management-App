import React from 'react';
import { useParams } from 'react-router-dom';
import { useTasks } from '../Context/TaskContext';
import { useNavigate } from 'react-router-dom';
import { doc, getDoc} from "firestore/firebase";
import { db } from '../services/firebase';
import {useState, useEffect } from "react";
import Loader from "./Loader"

const DeleteTask = () => {
    const { id } = useParams();
    const { removeTask } = useTasks();
    const navigate = useNavigate();
    const [taskToDelete, setTaskToDelete] = useState(null);
    const[loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTask = async() => {
            try{
                const docRef = doc(db, "tasks", id);
                const docSnap = await getDoc(docRef);
                if(!docSnap.exists()) throw new Error("Task not found");
                setTaskToDelete({id: docSnap.id, ...docSnap.data()});
            }catch(error){
                console.error("Task not found:", error)
            }finally{
                setLoading(false);
            };
        } ;
        fetchTask();
    }, [id])
    const handleDelete = async({taskId}) => {
        e.preventDefault();
        console.log("Task to be deleted:", taskToDelete)
        if(taskToDelete.id === id){
           await removeTask(id);
           navigate("/seeAllTasks");
        }
    }
  return (
    <div>
        { loading ? <Loader loading={loading}/> : <p>Task deleted successfully</p>}
    </div>
  )
}

export default DeleteTask