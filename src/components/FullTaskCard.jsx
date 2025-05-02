import React from 'react';
import { doc, getDoc } from "firebase/firestore";
import { db } from '../services/firebase';
import Subtask from "./Subtask"
import AddSubtaskForm from './AddSubtaskForm';
import { useEffect, useState } from 'react';
import { FaBell } from 'react-icons/fa6';
import { FaClockRotateLeft } from 'react-icons/fa6';
import { FaPlus } from 'react-icons/fa6';
import NavBar from './NavBar';
import { useNavigate } from 'react-router-dom';
import EditSubtask from './EditSubtask';
import Loader from './Loader';

// full description  and details of the task created
const FullTaskCard = ({taskId}) => {
    const [task, setTask] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);

    const navigate = useNavigate();

    const pageOptions = [
        {label: "edit", onClick: () => navigate(`/edit-task/${task.id}`)},
        {label: "delete", onClick: () => alert("delete")}
    ]
    
    const handleButtonClick = () => {
       setShowForm((prevState) => !prevState)
    }
    useEffect(() => {
        const fetchTask = async () => {
           try {
            const taskRef = doc(db, "tasks", taskId);
            const taskSnap = await getDoc(taskRef);
            if(taskSnap.exists()){
                setTask({id: taskSnap.id, ...taskSnap.data()})
            } else(console.log("Task not found"))
           } catch(error){
            console.error("Error fetching task:", error)
           } finally{
            setLoading(false);
           }
        };
        fetchTask();
   },     [taskId])


   const handleSubtaskNewInput = (newSubtaskData) => {
    
        const updatedSubtaskData = task.subtasks.map((sub) => {
            sub.id === newSubtaskData.id ? newSubtaskData : sub
        });
        setTask({...prev, subtasks: updatedSubtaskData})

   };



    const subtasksLength = task?.subtasks?.length || 0;  
    loading ? <Loader loading={loading}/> : null;
    if (!task) return <div>Task not found</div>;

  return (
    <div className='bg-gray-100 w-full min-h-screen flex flex-col px-7'>
        
          <header className="flex w-full justify-between items-center fixed top-0 left-0  h-15 right-0 px-4 py-4">
              <NavBar pageOptions={pageOptions}/>
              <button className='text-xl'><FaBell/></button>
          </header>

           <main className='pt-15'>
                <h2 className='font-bold text-2xl py-2'>{task.title}</h2>
                <section>
                    <h3 className='font-semibold text-xl my-2'>Details:</h3>
                    <p className='text-lg text-wrap my-3 py-4'>{task.details}.</p>
                    <div className='flex '>
                        <div className='flex bg-gray-400 gap-2 py-2 rounded-sm items-center'>
                            <FaClockRotateLeft size={20}/>
                            <span className='align-middle'>Due: {task.due_date}</span>
                      </div>
                        
                        <div>
                            <div></div>
                       </div> 
                    </div>
                </section>
                <section className="all-subtasks-container py-6 flex flex-col gap-4 justify-evenly">
                   {subtasksLength > 0 ? (task.subtasks.map((subtask, index) =>(
                        <div className='mx-auto' key={subtask.id || `${subtask.title}-${index}`}>
                            <EditSubtask taskId={task.id} subtask={subtask} onSubtaskUpdate={handleSubtaskNewInput}/>
                        </div>
                        
                    ))) : (<p>No subtasks yet</p>)}
                </section>
                <button onClick={handleButtonClick} className='px-6 py-3 text-center rounded-lg border-dotted border-2 border-black flex items-center justify-center  bg-gray-300'>
                    <span className='mx-auto text-center'>
                        <FaPlus size={20}/>
                    </span>
                </button>
                {showForm &&  <AddSubtaskForm  taskId={task.id}/>}
         </main>
    
 </div>
  )
}

export default FullTaskCard