import React from 'react'
import { useTasks } from '../Context/TaskContext';
import Subtask from "./Subtask"


// full description  and details of the task created
const FullTaskCard = ({taskId}) => {
    const {tasks, updateTaskStatus, removeTask} = useTasks();

    const task = tasks.find((t) => t.id === parseInt(taskId))
    if(!task) return <div>Task not found</div>
  return (
    <div>
        <header className="w-full py-3 px-3">
            <nav className="flex gap-3 items-center justify-between">
                <a href=""><img src="" alt="back icon"/>bck</a>
                <a href=""><img src="" alt="icon icon"/>i</a>
                <a href=""><img src="" alt="alarm icon"/>bck</a>
            </nav>
            <h2>{task.title}</h2>
            <section>
                <p>{task.description}</p>
                <div>
                    <div>Deadline</div>
                    <div>AddSubtask</div>
                    <div>Spinner</div>
                </div>
            </section>
            <section className="all-subtasks-container">
                {task.subtasks.map((subtask) =>(
                    <Subtask key={subtask.id} taskId={task.id} subtask={subtask}/>
                ))}
            </section>
        </header>
    </div>
  )
}

export default FullTaskCard