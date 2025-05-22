import React from 'react';
import FilteredTask from '../components/filteredTask';
const PendingTasks = () => {
  return (
    <div>
        <FilteredTask status="pending"/>
    </div>
  )
}

export default PendingTasks