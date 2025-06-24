import React from 'react';
import FilteredTask from '../components/FilterTask';

const OngoingTasksPage = () => {
  return (
    <div>
        <FilteredTask status="ongoing"/>
    </div>
  )
}

export default OngoingTasksPage