import React from 'react';
import { useTasks } from '../Context/TaskContext';
import { useState } from 'react';
import { useNavigate } from "react-router-dom"

const AddNewTaskForm = () => {
    const { addTask } = useTasks();
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [details, setDetails] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [category, setCategory] = useState("")

    const handleChange = (e) => {
        const {name, value} = e.target;
        if(name === "title"){
            setTitle(value);
        } else if (name === "details"){
            setDetails(value);
        }  else if(name === "due_date"){
            setDueDate(value);
        }  else if(name === "category"){
            setCategory(value);
        }
    }
    const handleSubmit = async (e) =>{
        e.preventDefault();

        if(title && details){
            const newTask = {
                title,
                details,
                status: "pending",
                due_date : dueDate,
                category,
                subtasks: []
               
            }

            console.log("Submitting task:", newTask);
            try{
                const newTaskId = await addTask(newTask);
                console.log("Returned task ID:", newTaskId);
                navigate(`/task/${newTaskId}`);
            }catch(error){
                console.error("Unable to go to task page:", error);
            }
        } else{alert("Please fill in the title and description")}
    }
  return (
    <div className='bg-gray-100 w-full min-h-screen overflow-y-auto'>
        <form onSubmit={handleSubmit} className='flex flex-col gap-2 w-full p-7'>
            <label htmlFor="title" className='py-2'>Title</label>
            <input type="text" id="title" name="title" value={title} onChange={handleChange} placeholder='Web optimization' required
             className='w-full bg-gray-200 py-5 px-2 rounded-lg'
            />
          
            <label htmlFor="details" className='pb-2 pt-4'>Description</label>
            <textarea id="details" name="details" value={details} onChange={handleChange} placeholder='Write something...' 
              className='w-full bg-gray-200 py-5 px-2 rounded-lg'>
            </textarea>

            <label htmlFor="category"  className='pb-2 pt-4'>Choose a category:</label>
            <select id="category" name="category" className="bg-gray-300 py-3 rounded-lg" onChange={handleChange} value={category}>
                <option value="work" >Work</option>
                <option value="personal">Personal</option>
                <option value="fitness">Fitness</option>
            </select>
            <label htmlFor="due_date"  className='pb-2 pt-4'>Deadline</label>
            <input id="due_date" name="due_date"  className='py-2 mb-5 bg-gray-200 rounded-lg' onChange={handleChange} type="datetime-local"/>
            <button type="submit" className='place-self-center w-full py-4 rounded-lg bg-indigo-600'>Create Task</button>
        </form>
    </div>
  )
}

export default AddNewTaskForm