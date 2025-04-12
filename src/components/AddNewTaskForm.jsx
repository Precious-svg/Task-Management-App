import React from 'react';
import { useTasks } from '../Context/TaskContext';

const AddNewTaskForm = () => {
    const {addTask} = useTasks();

    const [title, setTitle] = useState();
    const [details, setDetails] = useState();
    const [dueDate, setDueDate] = useState()

    const handleChange =(e) => {
        const {name, value} = e.target;
        if(name === "title"){
            setTitle(value);
        } else if (name = "details"){
            setDetails(value);
        } else if(name === "due_Date"){
            setDueDate(value);
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
                created_at: Date.now(),
                category: e.target.value
               
            }
            addTask(newTask);
        } else{alert("Please fill in the title and description")}
    }
  return (
    <div>
        <form>
            <label for="title">Title</label>
            <input type="text" id="title" name="title" value={title} onchange={handleChange} placeholder='Web optimization' required/>
            <label for="details">Description</label>
            <textarea id="details" name="details" value={details} onchange={handleChange} placeholder='Write something...'></textarea>
            <label for="category">Choose a category:</label>
            <select id="category" name="category" onChange={handleChange} value={category}>
                <option value="work" >Work</option>
                <option value="personal">Personal</option>
                <option value="fitness">Fitness</option>
            </select>
            <label for="due_date">Deadline</label>
            <input id="due_date" name="due_date"type="datetime-local"/>
            <button onClick={handleSubmit}type="submit">Create Task</button>
        </form>
    </div>
  )
}

export default AddNewTaskForm