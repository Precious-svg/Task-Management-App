import React from 'react';
import FilteredTask from '../components/FilterTask';
const PendingTasks = () => {
  return (
    <div>
        <FilteredTask status="pending"/>
    </div>
  )
}

export default PendingTasks