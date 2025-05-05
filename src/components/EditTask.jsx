import React from 'react';
import { useParams } from 'react-router-dom';
import { useTasks } from '../Context/TaskContext';
import { useState, useEffect } from "react";
import { doc, getDoc} from "firebase/firestore";
import { db } from '../services/firebase';
import { useNavigate } from 'react-router-dom';
import Loader from './Loader';
import { FaArrowLeft } from 'react-icons/fa6';
import { Navigate } from 'react-router-dom';

// to go back a page



const EditTask = () => {
    const {updateTask, updateSubtask} = useTasks();
    const [loading, setLoading] = useState(true);
    const { id } = useParams();
    const navigate = useNavigate();
    const [taskData, setTaskData] = useState(
        {
            title: "",
            details: "",
            due_date : "",
            status: "", 
            due_date: "",
            category: "",
            subtasks: []
        }
    );

   

    // to update task data, function.

   
    useEffect(() =>{
        const fetchTask = async () => {
            try{
                const docRef = doc(db, "tasks", id);
                const docSnap = await getDoc(docRef);
                if(docSnap.exists()){
                    setTaskData({id: docSnap.id, ...docSnap.data()});
                } else{
                    console.error("Task not found")
                } 
            } catch(error){
                console.error("Error fetching tasks:", error)
            }
            finally{
                setLoading(false)
            };
        };
        fetchTask();
    }, [id]);

    const handleChange = (e) => {
        setTaskData((prevState) => ({...prevState, [e.target.name]: e.target.value}))
    }


    // to update subtask data function

    const handleSubtaskChange = (index, e) => {
        const subtasksData = taskData.subtasks
        const toUpdateSubtask = subtasksData.map((subtask, subtaskIndex) =>{
            subtaskIndex === index 
            ? {...subtask, [e.target.name]: e.target.value}
            : subtask

            return subtask;
        });

        setTaskData({...taskData, subtasks: toUpdateSubtask });
    }

    // for the submit button, which is the same as the save button

    const handleSubmit = async (e) => {
        e.preventDefault();
        await updateTask(id, taskData);

        for (const subtask of taskData.subtasks){
            await updateSubtask(id, subtask.id, subtask)
        }
       
        navigate(`/task/${id}`)
    }

    const handleBackClick = () => {
        console.log("Navigating back...")
        navigate(-1);
    }
  return (
    <div className='bg-gray-100 w-full min-h-screen'>
        <nav className="w-full pl-7 pt-2">
            <button onClick={handleBackClick} className="text-xl"><FaArrowLeft/></button>
        </nav>
        {loading ? <Loader loading={loading}/> : null}
        {!loading && taskData ?(
        <form onSubmit={handleSubmit} className='flex flex-col gap-2 w-full px-7 pt-2 pb-2'>
            
            <label htmlFor="title" className='py-2'>Title</label>
            <input type="text" id="title" name="title" value={taskData.title} onChange={handleChange} placeholder='Web optimization' required
             className='w-full bg-gray-200 py-5 px-2 rounded-lg'
            />
          
            <label htmlFor="details" className='pb-2 pt-4'>Description</label>
            <textarea id="details" name="details" value={taskData.details} onChange={handleChange} placeholder='Write something...' 
              className='w-full bg-gray-200 py-5 px-2 rounded-lg'>
            </textarea>

            <label htmlFor="category"  className='pb-2 pt-4'>Choose a category:</label>
            <select id="category" name="category" className="bg-gray-300 py-3 rounded-lg" onChange={handleChange} value={taskData.category}>
                <option value="work" >Work</option>
                <option value="personal">Personal</option>
                <option value="fitness">Fitness</option>
            </select>
            <label htmlFor="due_date"  className='pb-2 pt-4'>Deadline</label>
            <input id="due_date" name="due_date"  className='py-2 mb-5 bg-gray-200 rounded-lg' value={taskData.due_date} onChange={handleChange} type="datetime-local"/>

            {/* subtask section */}
            {
                taskData.subtasks && taskData.subtasks.length > 0 ? (
                taskData.subtasks.map((subtask, index) => {
                   return (<section key={index}>
                        <label htmlFor="title" className='py-4'>Title</label>
                        <input type="text" id="title" name="title" value={subtask.title} onChange={(e) => handleSubtaskChange(index, e)} placeholder='Web optimization' required
                         className="bg-white p-2" />
                        <label htmlFor="details" className='py-4'>Description</label>
                        <textarea id="details" name="details" value={subtask.details} onChange={(e) => handleSubtaskChange(index, e)} placeholder='Write something...' 
                        className='bg-white py-3  px-2 rounded-md'></textarea>
                  </section>)
                })) : (<p>No subtasks created</p>)
            }
            
            <button type="submit" className='place-self-center w-full py-4 rounded-lg bg-indigo-600'>Save</button>
        </form>) : <div>Loading tasks data </div>} 
    </div>
  )
}

export default EditTask