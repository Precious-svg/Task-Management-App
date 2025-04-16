import React from 'react';
import { useTasks } from '../Context/TaskContext';
import { useState } from 'react';

const AddNewTaskForm = () => {
    const {addTask} = useTasks();

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
        }  else if(name === "due_Date"){
            setDueDate(value);
        }  else if(name === "category"){
            setCategory(value);
        }
    }
    const handleSubmit =(e) =>{
        e.preventDefault();

        if(title & details){
            const newTask = {
                id: Date.now(),
                title,
                details,
                status: "pending",
                due_date : {dueDate},
                category
               
            }
            addTask(newTask);
        } else{alert("Please fill in the title and description")}
    }
  return (
    <div className='bg-gray-100 w-full min-h-screen'>
        <form className='flex flex-col gap-2 w-full p-7'>
            
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
            <button onClick={handleSubmit}type="submit" className='place-self-center w-full py-4 rounded-lg bg-indigo-600'>Create Task</button>
        </form>
    </div>
  )
}

export default AddNewTaskForm