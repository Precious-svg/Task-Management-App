import React from 'react';

import {useTasks} from "../Context/TaskContext"

const Subtask = ({taskId, subtask}) => {
    const {toggleSubtaskStatus} = useTasks();
    const handleCheckBoxChange = (e) => {
       let newStatus = e.target.checked ? "completed" : "pending"
        toggleSubtaskStatus(taskId, subtask.id, newStatus);
    }

  return (
    <>
         <h3>{subtask.title}</h3>
         <input type="checkbox" checked={subtask.status === "completed"} onChange={handleCheckBoxChange}/>
         {/* <textarea id="comments" name="comments"  value="add a comment..."></textarea> */}
    </>
  )
}

export default Subtask