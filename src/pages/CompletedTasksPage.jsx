import React from 'react';
import FilterTask from '../components/FilterTask';


const CompletedTasksPage = () => {
  return (
    <div>
        <FilterTask status="completed"/>
    </div>
  )
}

export default CompletedTasksPage