import React from 'react';
import FilteredTask from '../components/FilterTask';


const CompletedTasksPage = () => {
  return (
    <div>
        <FilteredTask status="completed"/>
    </div>
  )
}

export default CompletedTasksPage