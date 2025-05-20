import React from 'react';
import { useTasks } from '../Context/TaskContext';
import { useState } from 'react'; 
import { useNavigate, useParams } from "react-router-dom";
const AddSubtaskForm = ({taskId, onSubtaskCreated}) => {
    const {addNewSubtasks} = useTasks();
    const [title, setTitle] = useState("");
    const [details, setDetails] = useState("");
    const { id } = useParams();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const {name, value} = e.target;
        if(name === "title"){
            setTitle(value)
        } else if (name === "details"){
            setDetails(value);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(title && details){
            const newSubtask = {
                title,
                details,
                status: "pending"
            }
            console.log("Submitting task:", newSubtask);
            try{
                await addNewSubtasks(newSubtask, taskId);
                if(onSubtaskCreated){
                    onSubtaskCreated(addNewSubtasks);
                }
                navigate(`/task/${id}`)
            } catch(error){
                console.error("Unable to go to task page:", error);
            }
            
        } else {alert("please fill in the title and descriptrion")}
    }
  return (
    <div>
        <form onSubmit={handleSubmit} className='flex flex-col items-start justify-center mx-auto overflow-y-auto relative'>
            <label htmlFor="title" className='py-4'>Title</label>
            <input type="text" id="title" name="title" value={title} onChange={handleChange} placeholder='Web optimization' required
             className="bg-white p-2" />
            <label htmlFor="details" className='py-4'>Description</label>
            <textarea id="details" name="details" value={details} onChange={handleChange} placeholder='Write something...'
             className='bg-white py-3  px-2 rounded-md'></textarea>
            <button type="submit" className='bg-indigo-600 p-2 rounded-md my-2'>Create Subtask</button>
        </form>    
    </div>
  )
}

export default AddSubtaskForm