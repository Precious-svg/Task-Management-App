import React from 'react';
import {createContext, useState, useEffect, useContext} from "react";
import taskDetails from "../taskDetails.json"


const TaskContext = createContext();
const TaskProvider = ({children}) => {
    const [tasks, setTasks] = useState(taskDetails);
    const addTask = (newTask) => setTasks((prevTasks) => [...prevTasks, {...newTask, created_at: Date.now().toISOString()}]);

    const removeTask = (taskId) => {
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId))
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

    const addNewSubtasks = (newSubtask, taskId) => {
        setTasks((prevTasks) => 
          prevTasks.map((task) =>{
                if(task.id === taskId){
                    const updatedSubTasks =  [
                        ...task.subtasks,
                        {...newSubtask, id: task.subtasks.length + 1, status: "pending"}
                    ];
                    return {...task, subtasks: updatedSubTasks}
                }
                return task;
            })
          
        );
    };

    const deleteSubtask = (subtaskId, taskId) => {
        setTasks((prevTasks) =>
            prevTasks.map((task) => {
                if(task.id === taskId){
                    const filteredSubtasks = task.subtasks.filter((subtask) => (subtask.id !== subtaskId))
                    return {...task, subtasks: filteredSubtasks}
                }  
             return task;
            })
        );
    };

  return (
    <TaskContext.Provider value={{tasks, addTask, removeTask, toggleSubtaskStatus, getTaskStatus, addNewSubtasks, deleteSubtask}}>
        {children}
   </TaskContext.Provider>
  )
}


export const useTasks = () => {
    return useContext(TaskContext);
}

export default TaskProvider;