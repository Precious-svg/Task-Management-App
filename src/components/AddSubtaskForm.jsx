import React from 'react';
import { useTasks } from '../Context/TaskContext';
import { useState } from 'react'; 
import { useParams } from "react-router-dom";
const AddSubtaskForm = ({taskId}) => {
    const { id } = useParams();
    const {addNewSubtasks, tasks} = useTasks();
    const task = tasks.find((task) => task.id === Number(taskId));
    const [title, setTitle] = useState("");
    const [details, setDetails] = useState("");

    const handleChange = (e) => {
        const {name, value} = e.target;
        if(title === "title"){
            setTitle(value)
        } else if (details === "details"){
            setDetails(value);
        }
    }

    const handleSubmit = (e) => {
        e.prevent.default;
        if(title & details){
            const newSubtask = {
                title,
                details,
                status: "pending"
            }
            addNewSubtasks(newSubtask, taskId={taskId})
        } else alert("please fiull in the title and descriptrion")
    }
  return (
    <div >
        <form className='flex flex-col items-start justify-center mx-auto'>
            <label htmlFor="title" className='py-4'>Title</label>
            <input type="text" id="title" name="title" value={title} onChange={handleChange} placeholder='Web optimization' required
             className="bg-white p-2" />
            <label htmlFor="details" className='py-4'>Description</label>
            <textarea id="details" name="details" value={details} onChange={handleChange} placeholder='Write something...'
             className='bg-white py-3  px-2 rounded-md'></textarea>
            <button onClick={handleSubmit}type="submit" className='bg-indigo-600 p-2 rounded-md my-2'>Create Subtask</button>
        </form>    
    </div>
  )
}

export default AddSubtaskForm