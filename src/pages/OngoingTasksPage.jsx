import React from 'react';
import FilterTask from '../components/FilterTask';

const OngoingTasksPage = () => {
  return (
    <div>
        <FilterTask status="ongoing"/>
    </div>
  )
}

export default OngoingTasksPage